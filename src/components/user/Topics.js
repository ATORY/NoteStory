import React, { useState } from 'react';
import Modal from '@material-ui/core/Modal';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import CloseIcon from '@material-ui/icons/Close';
import AddCircleIcon from '@material-ui/icons/AddCircleOutline';
import RemoveCircleIcon from '@material-ui/icons/RemoveCircleOutline';
import { makeStyles } from '@material-ui/styles';
import clsx from 'clsx';
import {
  fetchQuery,
  commitMutation,
  createPaginationContainer,
  graphql
} from 'react-relay';

import headersGen from 'cover/headersGen';

const mutation = graphql`
  mutation Topics_Mutation($input: TopicInput!) {
    createTopic(input: $input) {
      id
    }
  }
`;

const updateMutation = graphql`
  mutation Topics_Update_Mutation($id: ID!, $input: TopicInput!) {
    updateTopic(id: $id, input: $input) {
      id
    }
  }
`;

const useStyles = makeStyles(() => ({
  root: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
    gridGap: '1rem',
    justifyContent: 'center',
    alignItems: 'center'
  },
  item: {
    // justifySelf: 'stretch',
    display: 'flex',
    border: '1px solid #eaeaea',
    // padding: '1.5rem',
    // width: '260px',
    height: '230px',
    '&.add': {
      transition: 'all 0.2s',
      borderStyle: 'dashed',
      alignItems: 'center',
      justifyContent: 'center',
      cursor: 'pointer',
      color: '#969696',
      fill: '#969696',
      '&:hover': {
        background: '#969696',
        color: '#fff',
        fill: '#fff'
      },
      '& > div': {
        '& > *': {
          verticalAlign: 'bottom',
          fontSize: '30px'
        }
      }
    }
  },
  paper: {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#fff',
    // position: 'absolute',
    width: 700,
    height: '95%',
    // border: '2px solid #000',
    // boxShadow: theme.shadows[5],
    // padding: theme.spacing(2, 4, 4),
    outline: 'none'
  },
  paperTitle: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '10px 20px',
    borderBottom: '1px solid #d3d3d3'
  },
  paperStorySelect: {
    padding: '10px 20px',
    borderBottom: '1px solid #d3d3d3'
    // borderLeft: 'none',
    // borderRight: 'none'
  },
  paperMain: {
    display: 'flex',
    flexDirection: 'column',
    margin: '5px 15px 10px 15px',
    '& input.title': {
      flexGrow: 1,
      fontSize: '20px',
      margin: '10px 0 15px 0',
      padding: '8px'
    }
  },
  paperMainIntroImg: {
    display: 'flex',
    '& > div': {
      display: 'flex',
      width: '50%'
    },
    '& textarea': {
      flexGrow: 1,
      borderColor: '#d3d3d3',
      resize: 'none',
      minHeight: '100px',
      maxHeight: '100px',
      fontSize: '1rem',
      padding: '5px'
    },
    '& .imageSelect': {
      border: '1px solid #d3d3d3',
      fill: '#696969',
      color: '#696969',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      cursor: 'pointer',
      select: 'none',
      '& *': {
        cursor: 'pointer'
      }
    }
  },
  storySelectC: {
    flexGrow: 1,
    overflow: 'auto',
    '& > div': {
      border: '1px solid #d3d3d3',
      borderTop: 'none',
      overflowY: 'scroll',
      display: 'flex',
      flexDirection: 'column'
    }
  }
}));

// eslint-disable-next-line react/prop-types
function Topic({ environment, info }) {
  const { topics } = info;
  // console.log(topics);
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [topic, setTopic] = useState({
    id: '',
    title: '',
    snapImg: '',
    intro: ''
  });
  const [publishes, setPublishes] = useState([]);
  const [selects, setSelects] = useState([]);
  const [pageInfo, setPageInfo] = useState({
    endCursor: '',
    hasNextPage: false
  });
  const inputRef = React.createRef();

  const handleOpen = () => {
    setOpen(true);
    if (publishes.length === 0) {
      fetchPublish();
    }
  };

  const handleClose = () => {
    setOpen(false);
  };
  const addToSelectes = node => {
    setSelects([...selects, node]);
  };
  const removeFromSelectes = node => {
    const index = selects.findIndex(item => item.id === node.id);
    setSelects([...selects.slice(0, index), ...selects.slice(index + 1)]);
  };

  const savaTopic = () => {
    topic.stories = selects.map(item => item.id);
    const headers = headersGen();
    headers['Content-Type'] = 'application/octet-stream';
    if (topic.snapImg.startsWith('blob')) {
      const ext = '.' + inputRef.current.value.split('.').pop();
      const reader = new FileReader();
      reader.onload = function(evt) {
        const headers = headersGen();
        headers['Content-Type'] = 'application/octet-stream';
        fetch(
          window.isElectron
            ? `${process.env.NOTESTORY_APP_SERVER_URI}/upload/image?ext=${ext}`
            : `/upload/image?ext=${ext}`,
          {
            method: 'PUT',
            headers,
            body: evt.target.result
          }
        )
          .then(response => response.json())
          .then(data => {
            // setTopic({ ...topic, snapImg: data.uri });
            mutationTopic(data.uri);
          });
      };
      reader.readAsArrayBuffer(inputRef.current.files[0]);
      // console.log(responeData);
    } else {
      mutationTopic();
    }
    function mutationTopic(snapImg = '') {
      const _topic = { ...topic };
      if (snapImg) _topic.snapImg = snapImg;
      setTopic(_topic);
      if (_topic.id) {
        commitMutation(environment, {
          mutation: updateMutation,
          variables: {
            id: _topic.id,
            input: {
              title: _topic.title,
              snapImg: _topic.snapImg,
              intro: _topic.intro,
              stories: _topic.stories
            }
          },
          onCompleted: (response, errors) => {
            console.log('Response received from server.', response, errors);
            handleClose();
          },
          onError: err => console.error(err, '---')
        });
      } else {
        commitMutation(environment, {
          mutation,
          variables: {
            input: {
              title: _topic.title,
              snapImg: _topic.snapImg,
              intro: _topic.intro,
              stories: _topic.stories
            }
          },
          onCompleted: (response, errors) => {
            console.log('Response received from server.', response, errors);
            handleClose();
          },
          onError: err => console.error(err, '---')
        });
      }
    }
  };

  function fetchPublish() {
    fetchQuery(
      environment,
      graphql`
        query TopicsPublishQuery($token: String!, $first: Int, $after: String) {
          info: userInfo(token: $token) {
            publishedStories(after: $after, first: $first)
              @connection(key: "user_publishedStories") {
              edges {
                node {
                  id
                  title
                  intro
                }
              }
              pageInfo {
                endCursor
                hasNextPage
              }
            }
          }
        }
      `,
      {
        token: localStorage.getItem('token'),
        first: 10
      }
    )
      .then(data => {
        setPublishes(data.info.publishedStories.edges);
        setPageInfo(data.info.publishedStories.pageInfo);
      })
      .catch(console.error);
  }
  return (
    <>
      <div className={classes.root}>
        <div className={clsx(classes.item, 'add')} onClick={handleOpen}>
          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="44"
              height="44"
              viewBox="0 0 24 24"
            >
              <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" />
              <path d="M0 0h24v24H0z" fill="none" />
            </svg>
            <span>新建</span>
          </div>
        </div>
        {topics.edges.map(({ node }) => {
          return (
            <TopicCard
              key={node.id}
              node={node}
              className={classes.item}
              onEdit={() => {
                setTopic(node);
                setSelects(node.stories);
                handleOpen();
              }}
            />
          );
        })}
        {/* <div className={classes.item} onClick={() => setTopic({})}>
          Topic
        </div>
         */}
      </div>
      <Modal
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
        aria-labelledby="addtopic-modal-title"
        aria-describedby="addtopic-modal-description"
        disableBackdropClick
        open={open}
        onClose={handleClose}
      >
        <div className={classes.paper}>
          <div className={classes.paperTitle}>
            <Typography variant="h6" component="h6">
              {topic.id ? '编辑' : '新建'}专题
            </Typography>
            <div>
              <CloseIcon onClick={handleClose} />
            </div>
          </div>
          <div className={classes.paperMain}>
            <input
              className={'title'}
              placeholder="标题"
              value={topic.title}
              onChange={e => {
                setTopic({ ...topic, title: e.target.value });
              }}
            />
            <div
              className={clsx(classes.paperMainIntroImg, 'bg-center')}
              style={{
                borderRadius: 'initial',
                backgroundImage: topic.snapImg ? `url('${topic.snapImg}')` : ''
              }}
            >
              <div
                className={'imageSelect'}
                onClick={() => {
                  inputRef.current.click();
                }}
              >
                <input
                  ref={inputRef}
                  style={{ display: 'none' }}
                  type="file"
                  accept="image/*"
                  onChange={e => {
                    const files = e.target.files;
                    if (files[0]) {
                      console.log(files[0]);
                      if (files[0].size > 300 * 1024) return;
                      const imgSrc = URL.createObjectURL(files[0]);
                      setTopic({ ...topic, snapImg: imgSrc });
                    }
                  }}
                />
                <label>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="34"
                    height="34"
                    viewBox="0 0 24 24"
                  >
                    <path d="M0 0h24v24H0z" fill="none" />
                    <path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z" />
                  </svg>
                </label>
                <span style={{ fontSize: '13px' }}>选择简图</span>
              </div>
              <div>
                <textarea
                  placeholder="简介"
                  value={topic.intro}
                  onChange={e => {
                    setTopic({ ...topic, intro: e.target.value });
                  }}
                />
              </div>
            </div>
          </div>
          <div
            style={{
              flexGrow: 1,
              overflow: 'auto',
              display: 'flex',
              flexDirection: 'column'
            }}
          >
            <Typography
              variant="subtitle1"
              component="div"
              className={classes.paperStorySelect}
            >
              Story 选择
            </Typography>
            <div
              className={clsx(classes.paperMainIntroImg, classes.storySelectC)}
              style={{ margin: '' }}
            >
              <div style={{ marginRight: '15px', padding: '0 10px' }}>
                {selects.map(node => (
                  <StoryCell
                    key={node.id}
                    className={'selected'}
                    removeFromSelectes={removeFromSelectes}
                    node={node}
                  />
                ))}
              </div>
              <div style={{ marginLeft: '15px', padding: '0 10px' }}>
                {publishes
                  .filter(({ node }) => {
                    if (selects.findIndex(item => item.id === node.id) === -1) {
                      return true;
                    }
                    return false;
                  })
                  .map(({ node }) => (
                    <StoryCell
                      key={node.id}
                      node={node}
                      addToSelectes={addToSelectes}
                    />
                  ))}
                <div>{pageInfo.hasNextPage ? 'loadmore' : ''}</div>
              </div>
            </div>
          </div>
          <div
            style={{
              marginTop: '10px',
              padding: '10px',
              display: 'flex',
              justifyContent: 'flex-end'
            }}
          >
            <Button onClick={savaTopic}>保存</Button>
          </div>
        </div>
      </Modal>
    </>
  );
}

export const query = graphql`
  query TopicsQuery($token: String!, $first: Int, $after: String) {
    info: userInfo(token: $token) {
      ...Topics_info @arguments(first: $first, after: $after, token: $token)
    }
  }
`;

export default createPaginationContainer(
  Topic,
  {
    info: graphql`
      fragment Topics_info on User
        @argumentDefinitions(
          first: { type: "Int", defaultValue: 10 }
          after: { type: "String", defaultValue: "" }
          token: { type: "String", defaultValue: "" }
          # orderby: { type: "[FriendsOrdering]", defaultValue: [DATE_ADDED] }
        ) {
        topics(after: $after, first: $first) @connection(key: "user_topics") {
          edges {
            node {
              id
              title
              intro
              snapImg
              stories {
                id
                title
              }
            }
          }
          pageInfo {
            endCursor
            hasNextPage
          }
        }
      }
    `
  },
  {
    direction: 'forward',
    getConnectionFromProps(props) {
      // console.log('getConnectionFromProps');
      return props.info && props.info.topics;
    },
    getVariables(props, { count, cursor }, fragmentVariables) {
      console.log('getVariables', props, cursor, count);
      return {
        token: localStorage.getItem('token'),
        first: count,
        after: cursor,
        // orderBy: fragmentVariables.orderBy,
        // userID isn't specified as an @argument for the fragment, but it should be a variable available for the fragment under the query root.
        userID: fragmentVariables.userID
      };
    },
    query
  }
);

const _useStyles = makeStyles(() => ({
  root: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    margin: '5px 15px 10px 15px',
    border: '1px solid #d3d3d3',
    '& h5': {
      margin: '5px'
    },
    '& .add, & .remove': {
      display: 'flex',
      alignItems: 'center',
      position: 'absolute',
      height: '100%',
      cursor: 'pointer',
      visibility: 'hidden'
    },
    '& .add': {
      left: '-25px'
    },
    '& .remove': {
      right: '-25px'
    },
    '&:hover': {
      '& .add': {
        visibility: 'visible'
      }
    },
    '&.selected': {
      '& .add': {
        visibility: 'hidden !important'
      },
      '&:hover': {
        '& .remove': {
          visibility: 'visible'
        }
      }
    }
  }
}));
// eslint-disable-next-line react/prop-types
function StoryCell({ node, addToSelectes, removeFromSelectes, className }) {
  const classes = _useStyles();
  return (
    <div className={clsx(classes.root, className)}>
      <div
        className="add"
        onClick={() => {
          addToSelectes(node);
        }}
      >
        <AddCircleIcon />
      </div>
      <h5>{node.title}</h5>
      <div
        className="remove"
        onClick={() => {
          removeFromSelectes(node);
        }}
      >
        <RemoveCircleIcon />
      </div>
    </div>
  );
}

const cardStyle = makeStyles(() => ({
  root: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    '& .bg-center': {
      height: '60%',
      width: '100%'
    },
    '& h1': {
      margin: '5px',
      fontSize: '1.5rem',
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis'
    },
    '& p': {
      margin: '0 5px',
      wordWrap: 'break-word',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      '-webkit-line-clamp': 2,
      maxHeight: '48px',
      display: '-webkit-box',
      fontSize: '14px',
      lineHeight: '24px',
      '-webkit-box-orient': 'vertical'
    },
    '& .editor': {
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.7)',
      color: 'white',
      height: 0,
      textAlign: 'center',
      cursor: 'pointer'
    },
    '&:hover': {
      '& .editor': {
        height: 'auto'
      }
    }
  }
}));

// eslint-disable-next-line react/prop-types
function TopicCard({ node, className, onEdit }) {
  const classes = cardStyle();
  return (
    <div className={clsx(className, classes.root)}>
      <div
        className="bg-center"
        style={{
          borderRadius: 0,
          backgroundColor: '#44bbbb',
          backgroundImage: node.snapImg ? `url("${node.snapImg}")` : ''
        }}
      />
      <h1>{node.title}</h1>
      <p>{node.intro}</p>
      <div className="editor" onClick={onEdit}>
        编辑
      </div>
    </div>
  );
}
