/* eslint-disable relay/unused-fields */
import React, { useReducer, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Split from 'react-split';
import { makeStyles } from '@material-ui/styles';
import { Helmet } from 'react-helmet';
import root from 'window-or-global';

import { environment } from 'electron/App';
import {
  fetchQuery,
  // createFragmentContainer,
  // createPaginationContainer,
  graphql
} from 'react-relay';

import Nav from './Nav';
import Middle from './Middle';
import Main from './Main';
import Footer, { footerHeight } from './Footer';
import { initialState, reducer, ElectronContext } from './state';
// import icon from 'icon.png';

// eslint-disable-next-line no-unused-vars
const useStyles = makeStyles(theme => ({
  root: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    right: 0
  }
}));

const initSizes = [15, 20, 65];

const query = graphql`
  query electron_user_Query {
    user: auth {
      id
      nickname
      avator
    }
  }
`;

export default function Index() {
  // console.log({ relay });
  if (!root.isElectron) {
    return null;
  }
  const classes = useStyles();
  const [state, dispatch] = useReducer(reducer, initialState);
  const [sizes, setSizes] = useState(initSizes);
  const [user, setUser] = useState({});
  // const [mainWidth, setMainWidth] = useState(window.offsetWidth * 0.6);
  const listener = (event, data) => {
    // console.log('init listener', data);
    dispatch({ type: 'init', data });
  };
  useEffect(() => {
    fetchWithToken();
    const { ipcRenderer } = window.require('electron');
    ipcRenderer.on('init-reply', listener);
    ipcRenderer.send('init', state.selectNavId);
    return function cleanup() {
      ipcRenderer.removeAllListeners();
      // ipcRenderer.removeListener('init-reply', listener);
    };
  }, []);

  // const refetchWithToken = () => {
  //   const refetchVariables = () => {
  //     return {
  //       token: localStorage.getItem('token')
  //     };
  //   };
  //   relay.refetch(refetchVariables);
  // };
  const fetchWithToken = () => {
    fetchQuery(environment, query)
      .then(data => {
        // console.log(data);
        if (data.user) {
          setUser(data.user || {});
        }
        // access the graphql response
      })
      .catch(err => {
        // console.log('fghjkl---', err.message);
        console.error(err);
      });
  };

  if (state.initData !== 'done') {
    return (
      <div
        style={{
          position: 'fixed',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
          height: '100%'
        }}
      >
        {/* <img src={icon} style={{ width: '20%' }} /> */}
      </div>
    );
  }
  // console.log('--- user', user);

  return (
    <ElectronContext.Provider value={{ ...state, dispatch, sizes }}>
      <Helmet>
        <meta charSet="utf-8" />
        <title>{'NoteStory'}</title>
      </Helmet>
      <div className={classes.root}>
        <Split
          style={{
            display: 'flex',
            flexDirection: 'row',
            width: '100%',
            // height: '100%',
            height: `calc(100% - ${footerHeight}px)`,
            position: 'fixed'
          }}
          // onDrag={() => {
          //   const editorContainer = document.getElementById('editor-container');
          //   const editorWidth = editorContainer.offsetWidth;
          //   // setMainWidth(editorWidth);
          //   // console.log({ editorWidth });
          // }}
          onDragEnd={sizes => {
            // console.log(sizes);
            setSizes(sizes);
          }}
          elementStyle={(dimension, size) => {
            // console.log({ dimension, size, index });
            return {
              'flex-basis': `calc(${size}%)`
            };
          }}
          gutterStyle={() => ({
            // 'flex-basis': `${0}px`
          })}
          sizes={initSizes}
          minSize={[150, 200, 760]}
        >
          <Nav />
          <Middle />
          <Main />
        </Split>
        <Footer
          user={user}
          loginSuccess={() => {
            fetchWithToken();
          }}
          logoutSuccess={() => {
            fetchWithToken();
          }}
        />
      </div>
    </ElectronContext.Provider>
  );
}

Index.propTypes = {
  user: PropTypes.object,
  relay: PropTypes.object
};

// export const query = graphql`
//   query electron_user_Query {
//     user: auth {
//       ...electron_user
//     }
//   }
// `;

// // export default createFragmentContainer(Index, {
// export default createRefetchContainer(
//   Index,
//   graphql`
//     fragment electron_user on User @connection(key: "AuthUser") {
//       id
//       nickname
//     }
//   `,
//   query
// );
