/* eslint-disable no-unused-vars */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Editor from 'draft-js-plugins-editor';
import Button from '@material-ui/core/Button';
import {
  EditorState,
  convertToRaw,
  convertFromRaw,
  convertFromHTML,
  ContentState,
  RichUtils
} from 'draft-js';
import markdownit from 'markdown-it';
import katex from 'katex';
import createMarkdownShortcutsPlugin from '@atory/draft-js-plugins-markdown-shortcuts';
import {
  draftjsToMarkdown,
  markdownToDraftjs
} from '@atory/draft-js-markdown-converter';
import { StaticToolbar, getBlockStyle } from '@atory/draft-js-static-toolbar';
import createImagePlugin from '@atory/draft-js-plugins-image';
import createKaTeXPlugin from '@atory/draft-js-plugins-katex';
import { commitMutation, graphql } from 'react-relay';
import Snackbar from '@material-ui/core/Snackbar';
import Modal from '@material-ui/core/Modal';
import SnackbarContentWrapper from 'components/utils/SnackbarContentWrapper';
import { environment } from 'electron/App';

import { encContent, mdStrToPlainText } from 'cover/cryptoUtil';
import {
  REPLY,
  OPEN_IMAGE_LIB,
  IMAGE_DATA,
  UPLOAD_LOCAL_IMAGE,
  UPDATE_SERVER_ID,
  SAVE_MD,
  SAVE_PDF
} from 'cover/ipcChannel';

// import ImageLibModal from './ImageLibModal';
import prismPlugin, { languages } from './plugins/prism';
import addLinkPlugin from './plugins/addLink';

import 'katex/dist/katex.min.css';
import 'prismjs/themes/prism.css';
import 'github-markdown-css';
import './styles/draft.css';
import './styles/index.css';

const md = markdownit({});

const imagePlugin = createImagePlugin();
const kaTeXPlugin = createKaTeXPlugin();

const plugins = [
  kaTeXPlugin,
  addLinkPlugin,
  prismPlugin,
  imagePlugin,
  createMarkdownShortcutsPlugin({
    languages: languages
  })
];

const contentStateFormMDStr = mdStr => {
  const rawDraftContentState = markdownToDraftjs(mdStr);
  const contentState = convertFromRaw(rawDraftContentState);
  // console.log({ rawDraftContentState });
  const editorState = EditorState.createWithContent(contentState);
  return editorState;
};

const newMutation = graphql`
  mutation Editor_NewStory_Mutation($input: StoryInput!) {
    story: createStory(input: $input) {
      id
      md5
    }
  }
`;
const updateMutation = graphql`
  mutation Editor_UpdateStory_Mutation($id: ID!, $input: StoryInput!) {
    story: updateStory(id: $id, input: $input) {
      id
      md5
    }
  }
`;

function mdStrToState(mdStr) {
  const html = md.render(mdStr);
  // console.log(mdStr);
  // console.log(html);
  const blocksFromHTML = convertFromHTML(html);
  const state = ContentState.createFromBlockArray(
    blocksFromHTML.contentBlocks,
    blocksFromHTML.entityMap
  );
  const editorState = EditorState.createWithContent(state);
  return editorState;
}

const fixedHeight = 100;
export default class StoryEditor extends Component {
  static propTypes = {
    toolbarFixed: PropTypes.bool,
    width: PropTypes.number,
    selectStory: PropTypes.shape({
      _id: PropTypes.string,
      id: PropTypes.string,
      content: PropTypes.string,
      key: PropTypes.string
    }),
    onTitleChange: PropTypes.func,
    showLoginWaring: PropTypes.func,
    onContentChange: PropTypes.func,
    dispatch: PropTypes.func
  };
  static defaultProps = {
    toolbarFixed: false,
    width: 60,
    showLoginWaring: () => {},
    onTitleChange: () => {},
    onContentChange: () => {}
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    const {
      content = '',
      _id = '',
      key = '',
      title = ''
    } = nextProps.selectStory;
    if (_id !== prevState._id) {
      const decStr = content;
      const editorState = decStr
        ? contentStateFormMDStr(decStr)
        : EditorState.createEmpty();
      // const editorState = decStr
      //   ? mdStrToState(decStr)
      //   : EditorState.createEmpty();
      return {
        _id,
        title,
        editorState
      };
    }
    return null;
  }

  constructor(props) {
    // console.log('editor', props);
    super(props);
    const { content = '', _id = '', key = '', title = '' } =
      props.selectStory || {};
    const decStr = content;
    const editorState = decStr
      ? contentStateFormMDStr(decStr)
      : EditorState.createEmpty();
    // const editorState = decStr
    //   ? mdStrToState(decStr)
    //   : EditorState.createEmpty();
    // console.log('constructor');
    this.state = {
      _id,
      title,
      editorState,
      readOnly: false,
      successOpen: false,
      progress: '',
      // imageLibModalOpen: false,
      imageLibData: {}
    };
    this.wordCount = 0;
    this.titleTimer = '';
    this.setDomEditorRef = ref => (this.domEditor = ref);
  }

  onTitleChange = title => {
    this.setState({
      title
    });
    const { _id } = this.props.selectStory;
    this.props.onTitleChange({ _id, title });
  };

  onChange = editorState => {
    this.setState(
      {
        editorState
      },
      () => {
        const { _id = '', content = '' } = this.props.selectStory;
        let key =
          this.props.selectStory.key ||
          Math.random()
            .toString(36)
            .substr(2);
        const mdStr = this.toMD();
        if (content !== mdStr && mdStr) {
          this.props.onContentChange({
            _id,
            content: mdStr,
            key
          });
        }
      }
    );
  };

  toMD = () => {
    // const { key } = this.props.selectStory;
    const contentState = this.state.editorState.getCurrentContent();
    const rawDraftContentState = convertToRaw(contentState);
    const mdStr = draftjsToMarkdown(rawDraftContentState);
    return mdStr;
  };

  handleCodeBlock = () => {
    const codeType = 'code-block';
    const { editorState } = this.state;
    const currentContent = editorState.getCurrentContent();
    let selection = editorState.getSelection();
    const key = selection.getStartKey();
    const blockMap = currentContent.getBlockMap();
    const block = blockMap.get(key);
    // console.log('===', block.getType())
    if ('unstyled' !== block.getType()) {
      this.onChange(
        RichUtils.toggleBlockType(this.state.editorState, codeType)
      );
      return;
    }
    const data = block.getData().merge({ language: 'js' });
    const newBlock = block.merge({ type: codeType, data });
    const newContentState = currentContent.merge({
      blockMap: blockMap.set(key, newBlock),
      selectionAfter: selection
    });
    this.onChange(
      EditorState.push(editorState, newContentState, 'change-block-type')
    );
  };

  toggleBlockType = blockType => {
    // console.log({ blockType });
    if (blockType === 'code-block') {
      this.handleCodeBlock();
      return;
    }
    this.onChange(RichUtils.toggleBlockType(this.state.editorState, blockType));
  };
  toggleInlineStyle = inlineStyle => {
    this.onChange(
      RichUtils.toggleInlineStyle(this.state.editorState, inlineStyle)
    );
  };

  saveASPDF = () => {
    // console.log('exportASPDF');
    const { ipcRenderer, remote } = window.require('electron');
    const { dialog, app } = remote;
    const homePath = app.getPath('home');
    // console.log({ homePath });
    const { title } = this.state;
    const options = {
      title: 'Save an PDF',
      defaultPath: `${homePath}/${title}.pdf`
      // filters: [{ name: 'mdFile', extensions: ['md'] }]
    };
    ipcRenderer.on(`${SAVE_PDF}-${REPLY}`, (event, data) => {
      // dispatch({ type: 'new', data: { category: selectNavId } });
      if (data.success) {
        this.setState({
          successOpen: true
        });
      }
    });
    dialog.showSaveDialog(options, (filename, bookmark) => {
      // console.log({ filename });
      if (!filename) return;
      const mdStr = this.toMD();
      ipcRenderer.send(`${SAVE_PDF}`, { filename, mdStr, title });
    });
  };

  saveASMD = () => {
    const { ipcRenderer, remote } = window.require('electron');
    const { title } = this.state;
    ipcRenderer.on(`${SAVE_MD}-${REPLY}`, (event, data) => {
      // dispatch({ type: 'new', data: { category: selectNavId } });
      if (data.success) {
        this.setState({
          successOpen: true
        });
      }
    });
    const { dialog } = remote;
    const options = {
      title: 'Save an markdown',
      defaultPath: `${title}.md`
      // filters: [{ name: 'mdFile', extensions: ['md'] }]
    };
    dialog.showSaveDialog(options, (filename, bookmark) => {
      // console.log({ filename });
      if (!filename) return;
      const mdStr = this.toMD();
      ipcRenderer.send(`${SAVE_MD}`, { filename, mdStr });
    });
  };

  handleMDFile = async mdFile => {
    const reader = new FileReader();
    reader.addEventListener(
      'load',
      () => {
        const mdStr = reader.result;
        const editorState = mdStr
          ? contentStateFormMDStr(mdStr)
          : EditorState.createEmpty();

        this.setState({
          editorState
        });
      },
      false
    );
    reader.readAsText(mdFile);
  };

  insertKatexBlock = katexContent => {
    // console.log('insertKatexBlock')
    const { editorState } = this.state;
    const newState = kaTeXPlugin.insertKaTeXBlock(editorState, katexContent);
    this.setState({
      editorState: newState
    });
  };

  handleImage = async imageFile => {
    // const imageUrl = await new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.addEventListener(
      'load',
      () => {
        const { ipcRenderer } = window.require('electron');
        ipcRenderer.send(`${IMAGE_DATA}`, reader.result);
      },
      false
    );

    reader.onerror = () => {
      // reject();
      console.log('reader file errr', imageFile);
    };
    reader.readAsDataURL(imageFile);
  };

  uploadImageFile = async (key, entity) => {
    // console.log({ key }, entity);
    const token = localStorage.getItem('token') || '';
    const { ipcRenderer } = window.require('electron');
    const { data } = entity;
    // console.log(data);
    const localSrc = decodeURI(data.url || data.src);
    const { imageSrc } = await new Promise((resolve, reject) => {
      const channel = `${UPLOAD_LOCAL_IMAGE}-${REPLY}-${key}`;
      const listener = (event, data) => {
        console.log({ channel });
        ipcRenderer.removeListener(channel, listener);
        if (data.message) reject({ message: data.message });
        else resolve(data);
      };
      ipcRenderer.on(channel, listener);
      ipcRenderer.send(`${UPLOAD_LOCAL_IMAGE}`, { localSrc, key, token });
    });
    // console.log({ imageSrc });
    data.url = imageSrc;
    data.src = imageSrc;
  };

  updateStory = async mdStr => {
    // console.log({ mdStr });
    if (!mdStr) return;
    // console.log('update...');
    const selectStory = { ...this.props.selectStory };
    const { _id = '', id, content, key, title } = selectStory;
    if (!_id || !id) return;
    const contentEnc = encContent(content, key);
    const intro = mdStrToPlainText(content, key);
    const variables = {
      id,
      input: {
        clientId: _id,
        title,
        content: contentEnc,
        wordCount: this.wordCount,
        intro,
        key,
        label: selectStory.label,
        md5: selectStory.currMD5
      }
    };
    commitMutation(environment, {
      mutation: updateMutation,
      variables,
      onCompleted: (response, errors) => {
        if (errors) console.error(errors);
        else {
          const { ipcRenderer } = window.require('electron');
          const { id, md5 } = response.story;
          ipcRenderer.send(`${UPDATE_SERVER_ID}`, { id, serverMD5: md5, _id });
        }
        // console.log('Response received from server.', response, errors);
      },
      onError: err => console.error(err, '---')
    });
  };
  uploadStory = async mdStr => {
    // console.log({ mdStr });
    if (!mdStr) {
      // console.log('no mdStr');
      return;
    }
    const selectStory = this.props.selectStory;
    // const { key = '', _id = '' } = selectStory;
    const { _id = '', content, key, title } = selectStory;
    if (!_id) return;
    const intro = mdStrToPlainText(content, key);
    const contentEnc = encContent(content, key);
    const variables = {
      input: {
        clientId: _id,
        title,
        content: contentEnc,
        wordCount: this.wordCount,
        intro,
        key,
        label: selectStory.label,
        md5: selectStory.currMD5
      }
    };
    commitMutation(environment, {
      mutation: newMutation,
      variables,
      onCompleted: (response, errors) => {
        if (errors) console.error(errors);
        else {
          const { ipcRenderer } = window.require('electron');
          const { id, md5 } = response.story;
          ipcRenderer.send(UPDATE_SERVER_ID, { id, serverMD5: md5, _id });
        }
        // console.log('Response received from server.', response, errors);
      },
      onError: err => console.error(err, '---')
    });
  };

  publishStory = ({ update = false }) => async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      this.props.showLoginWaring();
      return;
    }
    // TODO: modal present user ops
    const contentState = this.state.editorState.getCurrentContent();
    const rawDraftContentState = convertToRaw(contentState);
    // console.log(rawDraftContentState);
    const { entityMap } = rawDraftContentState;
    const needWaits = [];
    for (const key in entityMap) {
      if (Object.prototype.hasOwnProperty.call(entityMap, key)) {
        const entity = entityMap[key];
        const localSrc = entity.data.url || entity.data.src;
        if (entity.type === 'IMAGE' && localSrc.startsWith('file://')) {
          needWaits.push(this.uploadImageFile(key, entity));
        }
      }
    }
    // console.log('uploading image...');
    this.setState({ progress: '正在上传图片...' });
    await Promise.all(needWaits);
    // console.log('handle content...');
    this.setState({ progress: '正在处理内容...' });
    const mdStr = draftjsToMarkdown(rawDraftContentState);
    // console.log('upload done...');
    const newContentState = convertFromRaw(rawDraftContentState);
    // console.log({ rawDraftContentState });
    const editorState = EditorState.createWithContent(newContentState);
    this.setState(
      {
        editorState
      },
      async () => {
        await new Promise(resolve => {
          setTimeout(resolve, 1000); // 等待 1s, editorState -> change -> saveToDB -> change UIData -> update
        });
        if (update) await this.updateStory(mdStr);
        else await this.uploadStory(mdStr);
        this.setState({ progress: '成功 ^o^' });
        setTimeout(() => {
          this.setState({ progress: '' });
        }, 600);
      }
    );
  };

  removeLink = () => {
    const { editorState } = this.state;
    const selection = editorState.getSelection();
    if (!selection.isCollapsed()) {
      this.setState({
        editorState: RichUtils.toggleLink(editorState, selection, null)
      });
    }
  };

  addLink = link => {
    const { editorState } = this.state;
    const selection = editorState.getSelection();
    // const link = window.prompt('Paste the link -');
    if (!link) {
      this.onChange(RichUtils.toggleLink(editorState, selection, null));
      return 'handled';
    }
    const content = editorState.getCurrentContent();
    const contentWithEntity = content.createEntity('LINK', 'MUTABLE', {
      url: link
    });
    const newEditorState = EditorState.push(
      editorState,
      contentWithEntity,
      'create-entity'
    );
    const entityKey = contentWithEntity.getLastCreatedEntityKey();
    const state = RichUtils.toggleLink(newEditorState, selection, entityKey);
    this.onChange(state);
    return 'handled';
  };

  openImageLib = () => {
    const { ipcRenderer } = window.require('electron');
    ipcRenderer.send(`${OPEN_IMAGE_LIB}`);
  };

  focusEditor = () => {
    this.domEditor.focus();
  };

  componentDidMount() {
    const { ipcRenderer } = window.require('electron');
    ipcRenderer.on(`${IMAGE_DATA}-${REPLY}`, (event, data) => {
      const { filePath } = data;
      if (!filePath) return;
      // const { editorState } = this.state;
      // this.insertImage(`file://${filePath}`);
      const { editorState } = this.state;
      // const url = `file://${filePath}`;
      const imageUrl = filePath; // encodeURI(filePath);
      // console.log({ imageUrl });
      const state = imagePlugin.addImage(editorState, imageUrl, {});
      this.onChange(state);
    });
    ipcRenderer.on(`${UPDATE_SERVER_ID}-${REPLY}`, (event, data) => {
      const { id, _id, serverMD5 } = data;
      this.props.dispatch({
        type: 'updateServerId',
        data: { id, _id, serverMD5 }
      });
    });
  }

  render() {
    const btnStyle = {
      margin: 0,
      minWidth: 'auto',
      fontSize: 'small'
    };
    const {
      editorState,
      title,
      readOnly,
      successOpen,
      progress,
      // imageLibModalOpen,
      imageLibData
    } = this.state;
    const { _id = '', currMD5, serverMD5, id = '' } =
      this.props.selectStory || {};
    // console.log({ currMD5, serverMD5 });
    return (
      <div className="column-container">
        {/* <button onClick={this.toMD}>TOMD</button> */}
        <div
          style={{
            width: 'inherit',
            position: 'relative',
            display: 'table',
            height: `${fixedHeight}px`
          }}
        >
          <div
            style={{
              width: `calc(${this.props.width}%)`,
              position: 'fixed',
              zIndex: 10,
              background: '#fff'
            }}
          >
            <div
              className=""
              style={{
                display: 'flex',
                alignItems: 'center',
                paddingTop: 0
              }}
            >
              <input
                className="editor-title"
                disabled={_id === 'help'}
                placeholder="标题"
                value={title}
                onChange={e => this.onTitleChange(e.target.value)}
              />
              <div
                style={{
                  padding: '10px',
                  display: 'flex',
                  alignItems: 'center',
                  position: 'relative',
                  flexDirection: 'column'
                }}
              >
                {(() => {
                  if (!id)
                    return (
                      <div>
                        <Button
                          style={btnStyle}
                          onClick={this.publishStory({})}
                        >
                          发布
                        </Button>
                      </div>
                    );
                  return (
                    <div>
                      <Button
                        disabled={serverMD5 === currMD5}
                        style={btnStyle}
                        onClick={this.publishStory({ update: true })}
                      >
                        更新
                      </Button>
                      <a
                        href={`${process.env.NOTESTORY_APP_SERVER_URI}/story/${id}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Button style={btnStyle}>查看</Button>
                      </a>
                    </div>
                  );
                })()}
                {progress && (
                  <span
                    style={{
                      display: 'inline-block',
                      fontSize: '10px',
                      position: 'absolute',
                      bottom: 0,
                      width: '100px',
                      textAlign: 'center',
                      color: 'gray'
                    }}
                  >
                    {progress}
                  </span>
                )}
              </div>
            </div>
            <div
              id="toolbar-container"
              className="markdown-body in-electron"
              style={{
                paddingTop: 0,
                paddingBottom: 0,
                width: '100%',
                position: 'relative'
              }}
            >
              <div
                id="toolbar-shadow"
                style={{
                  height: 0,
                  margin: 0
                }}
              />
              <StaticToolbar
                style={{
                  padding: '0 12px 0 9px',
                  borderBottom: '1px solid #d4d4d4',
                  borderTop: '1px solid #d4d4d4'
                  // width: this.props.toolbarFixed
                  //   ? `calc(${this.props.width}% - 1px)`
                  //   : 'auto'
                }}
                btnContainerStyle={{
                  border: 'none'
                }}
                maxWidth={1980}
                minWidth={500}
                addLink={this.addLink}
                removeLink={this.removeLink}
                editorToolbarId={'editorToolbar'}
                editorState={editorState}
                toggleBlockType={this.toggleBlockType}
                toggleInlineStyle={this.toggleInlineStyle}
                onImageReady={this.handleImage}
                inElectron={window.isElectron}
                onMDFileReady={this.handleMDFile}
                exportASMD={this.saveASMD}
                exportASPDF={this.saveASPDF}
                readOnly={readOnly}
                focusEditor={this.focusEditor}
                readOnlyEditor={readOnly => {
                  this.setState({ readOnly });
                }}
                getWordCount={wordCount => {
                  this.wordCount = wordCount;
                }}
                openImageLib={this.openImageLib}
                katexRender={katex.render}
                kaTeXContent={this.state.kaTeXContent}
                insertKatex={this.insertKatexBlock}
              />
            </div>
          </div>
        </div>
        <div
          id="RichEditor-editor"
          className="markdown-body RichEditor-editor in-electron"
          style={{
            paddingTop: '5px',
            overflow: 'auto',
            flexGrow: 1
            // overflowY: 'auto',
            // height: `calc(100% - ${fixedHeight}px)`,
            // position: 'absolute'
          }}
        >
          <Editor
            ref={this.setDomEditorRef}
            readOnly={_id === 'help' || readOnly}
            blockStyleFn={getBlockStyle}
            editorState={this.state.editorState}
            onChange={this.onChange}
            plugins={plugins}
            placeholder="Write something here..."
          />
        </div>
        <Snackbar
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right'
          }}
          open={successOpen}
          autoHideDuration={2000}
          onClose={() => {
            this.setState({
              successOpen: false
            });
          }}
          style={{
            left: 'auto'
          }}
          // onClose={handleClose}
        >
          <SnackbarContentWrapper
            // onClose={handleClose}
            variant="success"
            message="保存成功!"
          />
        </Snackbar>
        <Modal
          open={progress !== ''}
          onClick={e => {
            e.stopPropagation();
            e.preventDefault();
          }}
          BackdropProps={{
            style: { backgroundColor: 'transparent', cursor: 'default' }
          }}
        >
          <div />
        </Modal>
      </div>
    );
  }
}
