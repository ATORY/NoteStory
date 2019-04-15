import React, { useContext, useEffect, useState } from 'react';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import AddIcon from '@material-ui/icons/Add';
import DoneIcon from '@material-ui/icons/Done';
import DeleteIcon from '@material-ui/icons/Delete';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
// import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Input from '@material-ui/core/Input';
import Link from 'found/lib/Link';

// import EditorContext from './Editor/Context';
import { ElectronContext } from './state';

let rootHeight = 80;

const useStyles = makeStyles(theme => {
  const { platform } = window.require('electron').remote.process;
  console.log(platform);
  const rootPadding =
    platform === 'linux' || platform === 'win32'
      ? theme.spacing(2, 2, 1, 1.5)
      : theme.spacing(4.5, 2, 1, 1.5);
  if (platform === 'linux' || platform === 'win32') rootHeight = 60;
  return {
    root: {
      padding: rootPadding,
      boxShadow: 'none',
      boxSizing: 'border-box',
      height: `${rootHeight}px`,
      '-webkit-app-region': 'drag',
      'user-select': 'none'
    },
    columnContainer: {
      height: `calc(100% - ${rootHeight}px)`
    },
    tag: {
      minHeight: 'auto',
      padding: theme.spacing(0, 1, 0, 1),
      boxShadow: 'none',
      display: 'flex',
      flexDirection: 'column',
      borderBottom: '1px solid #d3d3d3'
    },
    tagTop: {
      width: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between'
    },
    tagButton: {
      padding: theme.spacing(1)
    },
    nav: {
      paddingTop: 0
    },
    input: {
      // margin: theme.spacing(1)
      width: '100%'
    }
  };
});

export default function Nav() {
  const { staticNav, selectNavId, tags, dispatch } = useContext(
    ElectronContext
  );
  const [showName, setShowName] = useState(false);
  const [addTagStatus, setTagStatus] = useState(false);
  const [tag, setTag] = useState('');
  useEffect(() => {
    const { ipcRenderer, remote } = window.require('electron');
    const { platform } = remote.process;
    setShowName(platform !== 'linux' && platform !== 'win32');
    ipcRenderer.on('select-reply', (event, data) => {
      // dispatch({ type: 'new', data: { category: selectNavId } });
      const { stories, _id } = data;
      dispatch({
        type: 'nav',
        data: { _id, stories }
      });
    });
    ipcRenderer.on('tag-reply', (event, data) => {
      const { _id, label } = data;
      dispatch({ type: 'tag', data: { _id, label } });
      setTagStatus(false);
      setTag('');
    });
    ipcRenderer.on('deleteTag-reply', (event, data) => {
      const { tagId } = data;
      dispatch({ type: 'deleteTag', data: { tagId } });
    });
  }, []);
  function addTag() {
    if (tag) {
      const { ipcRenderer } = window.require('electron');
      ipcRenderer.send('tag', { tag });
    } else {
      setTagStatus(false);
    }
  }
  const classes = useStyles();
  return (
    <div>
      {showName && (
        <>
          <Paper className={classes.root}>
            <Link
              to="/"
              style={{
                textDecoration: 'none',
                color: 'black'
              }}
            >
              <Typography
                variant="h6"
                component="h6"
                style={{ display: 'inline' }}
              >
                NoteStory
              </Typography>
            </Link>
            {/* <Typography component="p">
              time loss become story.
            </Typography> */}
          </Paper>
          <Divider />
        </>
      )}
      <div className={`${classes.columnContainer} column-container`}>
        <List component="nav">
          {staticNav.map(item => (
            <ListItem
              key={item._id}
              button
              selected={selectNavId === item._id}
              onClick={() => {
                const { ipcRenderer } = window.require('electron');
                ipcRenderer.send('select', { category: item._id });
              }}
            >
              <ListItemText primary={item.label} />
              <ListItemSecondaryAction>{}</ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>
        <Divider />
        <Toolbar className={classes.tag}>
          <div className={classes.tagTop}>
            <Typography variant="subtitle1" component="h4">
              {'标签'}
            </Typography>
            {(addTagStatus && (
              <IconButton className={classes.tagButton} onClick={addTag}>
                <DoneIcon />
              </IconButton>
            )) || (
              <IconButton
                className={classes.tagButton}
                onClick={() => {
                  setTagStatus(true);
                }}
              >
                <AddIcon />
              </IconButton>
            )}
          </div>
          {addTagStatus && (
            <Input
              value={tag}
              placeholder="new tag"
              onChange={e => {
                setTag(e.target.value);
              }}
              onKeyDown={e => {
                if (e.keyCode === 13) addTag();
              }}
              className={classes.input}
              inputProps={{
                'aria-label': 'Description'
              }}
            />
          )}
        </Toolbar>
        <List component="nav" className={classes.nav}>
          {tags.map(item => {
            const selected = selectNavId === item._id;
            return (
              <ListItem
                key={item._id}
                button
                selected={selected}
                onClick={() => {
                  const { ipcRenderer } = window.require('electron');
                  ipcRenderer.send('select', { category: item._id });
                }}
              >
                <ListItemText primary={item.label} />
                <ListItemSecondaryAction>
                  {(selected && (
                    <IconButton
                      edge="end"
                      aria-label="Delete"
                      onClick={() => {
                        const { ipcRenderer } = window.require('electron');
                        ipcRenderer.send('deleteTag', { tagId: item._id });
                      }}
                    >
                      <DeleteIcon />
                    </IconButton>
                  )) ||
                    null}
                </ListItemSecondaryAction>
              </ListItem>
            );
          })}
        </List>
      </div>
    </div>
  );
}
