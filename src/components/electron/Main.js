import React, { useContext, useEffect, useState } from 'react';
import Modal from '@material-ui/core/Modal';
import Typography from '@material-ui/core/Typography';
// import Snackbar from '@material-ui/core/Snackbar';
// import SnackbarContent from '@material-ui/core/SnackbarContent';
import { makeStyles } from '@material-ui/core/styles';
// import green from '@material-ui/core/colors/green';
// import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import { TITLE, NEW, CONTENT } from 'cover/ipcChannel';
import { ElectronContext } from './state';
import Editor from './Editor';

const useStyles = makeStyles(theme => ({
  waringModal: {
    display: 'flex',
    // alignItems: 'center',
    justifyContent: 'center'
  },
  waringModalPaper: {
    position: 'absolute',
    // width: 400,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2),
    marginTop: '100px',
    outline: 'none'
  }
}));

const SAVE_TIME = 0.5 * 1000;
let contentTimer = '';
let titleTimer = '';
export default function Main() {
  const { tags, selectNavId, selectStory, dispatch, sizes, saved } = useContext(
    ElectronContext
  );
  // const [{ open }, setState] = useState({ open: false });
  const [fixed, setFixedState] = useState(false);
  const [needLoginWaring, setNeedLoginWaring] = useState(false);
  // const [story, setStory] = useState(selectStory || {});
  // console.log({ open });

  // useEffect(() => {
  //   console.log(story, selectStory);
  //   if (story._id !== selectStory._id) {
  //     setStory(selectStory);
  //   }
  // }, [selectStory]);
  useEffect(() => {
    const { ipcRenderer } = window.require('electron');
    ipcRenderer.on('title-reply', (event, data) => {
      const { currMD5 } = data;
      dispatch({ type: 'saved', data: { currMD5 } });
    });
    ipcRenderer.on('content-reply', (event, data) => {
      // setState({ status: 'done' });
      // console.log('auto saved...');
      const { currMD5 } = data;
      dispatch({ type: 'saved', data: { currMD5 } });
      // setState({ open: true });
    });
    // const container = document.getElementById('editor-container');
    // container.addEventListener('scroll', handleScroll);
    // return function clean() {
    //   container.removeEventListener('scroll', handleScroll);
    // };
  }, []);

  const onTitleChange = ({ _id, title }) => {
    if (titleTimer) clearTimeout(titleTimer);
    const lastUpdateTime = new Date();
    titleTimer = setTimeout(() => {
      clearTimeout(titleTimer);
      titleTimer = '';
      const { ipcRenderer } = window.require('electron');
      if (_id) {
        ipcRenderer.send(TITLE, {
          title,
          _id,
          lastUpdateTime,
          content: selectStory.content,
          key: selectStory.key
        });
        dispatch({ type: 'title', data: { title, lastUpdateTime } });
      } else {
        const tagLabel =
          (tags.find(item => item._id === selectNavId) || {}).label || '';
        ipcRenderer.send(NEW, {
          title,
          category: selectNavId,
          label: tagLabel
        });
      }
    }, SAVE_TIME);
    if (saved === true) dispatch({ type: 'saving' });
  };

  const onContentChange = ({ _id, content, key }) => {
    if (contentTimer) clearTimeout(contentTimer);
    const lastUpdateTime = new Date();
    contentTimer = setTimeout(() => {
      clearTimeout(contentTimer);
      contentTimer = '';
      const { ipcRenderer } = window.require('electron');
      if (_id) {
        ipcRenderer.send(CONTENT, {
          content,
          _id,
          lastUpdateTime,
          title: selectStory.title,
          key: selectStory.key
        });
        dispatch({
          type: 'content',
          data: { content, lastUpdateTime }
        });
      } else {
        console.log('---', content);
        const tagLabel =
          (tags.find(item => item._id === selectNavId) || {}).label || '';
        ipcRenderer.send(NEW, {
          category: selectNavId,
          label: tagLabel,
          content,
          key
        });
      }
    }, SAVE_TIME);
    if (saved === true) dispatch({ type: 'saving' });
  };

  // eslint-disable-next-line no-unused-vars
  function handleScroll() {
    const container = document.getElementById('editor-container');
    const toolbar = document.getElementById('editorToolbar');
    const toolbarShadow = document.getElementById('toolbar-shadow');
    const offsetTop = toolbar.parentElement.offsetTop;
    const scrollTop = container.scrollTop;
    if (scrollTop > offsetTop) {
      setFixedState(true);
      toolbar.style.position = 'fixed';
      toolbar.style.top = '-1px';
      toolbarShadow.style.height = `${toolbar.offsetHeight}px`;
    } else {
      setFixedState(false);
      toolbar.style.position = 'relative';
      toolbar.style.top = '0px';
      toolbarShadow.style.height = '0';
    }
  }
  const classes = useStyles();
  return (
    <div
      id="editor-container"
      style={{
        overflow: 'auto'
      }}
    >
      <Editor
        dispatch={dispatch}
        toolbarFixed={fixed}
        width={sizes[2]}
        status={status}
        selectStory={selectStory}
        // selectStory={story}
        onTitleChange={onTitleChange}
        onContentChange={onContentChange}
        showLoginWaring={() => setNeedLoginWaring(true)}
      />
      <Modal
        open={needLoginWaring}
        onClose={() => {
          setNeedLoginWaring(false);
        }}
        className={classes.waringModal}
      >
        <div className={classes.waringModalPaper}>
          <Typography variant="subtitle1" id="modal-title">
            请先登录账户
          </Typography>
        </div>
      </Modal>
    </div>
  );
}

/**
 * <Snackbar
        className={classes.success}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={open}
        autoHideDuration={3000}
        onClose={handleClose}
      >
        <SnackbarContent
          className={classes.successContent}
          aria-describedby="message-id"
          message={
            <span id="message-id" className={classes.message}>
              <CheckCircleIcon className={classes.icon} />
              已自动保存
            </span>
          }
        />
      </Snackbar>
 */
