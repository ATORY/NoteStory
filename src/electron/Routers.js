import React from 'react';
// import PropTypes from 'prop-types';
import { queryMiddleware, HashProtocol } from 'farce';
import {
  createFarceRouter,
  // createRender,
  makeRouteConfig,
  Route,
  RedirectException
} from 'found';
import { graphql } from 'react-relay';
import { query as userPublishedQuery } from 'components/user/Publish';
import { query as userFollowedQuery } from 'components/user/Followed';
import { environment } from './App';
import ElectronIndex from 'components/electron';
// import Web from 'components/Web';
import User, {
  UserInfo,
  UserPublish,
  UserFollowed
} from 'components/user/index';

// Expected prop `user` to be supplied to `Relay(Index)`, but got `undefined`. Pass an explicit `null` if this is intentional
const electronRouteConfig = makeRouteConfig(
  <Route path="/">
    <Route
      Component={ElectronIndex}
      // query={query}
      // prepareVariables={() => ({ token: localStorage.getItem('token') })}
      // render={({ error, props }) => {
      //   console.log(',,,,,', error, props);
      //   if (error) {
      //     <ElectronIndex user={{}} />;
      //   }
      //   if (!props) {
      //     <ElectronIndex user={{}} />;
      //   }
      //   return <ElectronIndex {...props} />;
      // }}
    />
    {/* <Route path="web" Component={Web} /> */}
    <Route
      path="center"
      // Component={User}
      prepareVariables={() => ({ token: localStorage.getItem('token') })}
      query={graphql`
        query RoutersUserViewQuery($token: String!) {
          userInfo(token: $token) {
            ...user_userInfo
          }
        }
      `}
      render={({ error, props }) => {
        // console.log(',,,,,', error, props);
        // console.log({ userInfo });
        // if (!(userInfo && userInfo.id)) throw new RedirectException('/');
        if (error) {
          throw new RedirectException('/');
        }
        if (!props) {
          return <div>loading</div>;
        }
        return <User {...props} environment={environment} />;
      }}
    >
      {/* <Route Component={UserInfo} /> */}
      <Route
        render={({ error, props }) => {
          // console.log(',,,,,', error, props);
          if (error) {
            return <div>Error!</div>;
          }
          if (!props) {
            return <div>loading</div>;
          }
          return <UserInfo {...props} environment={environment} />;
        }}
      />
      <Route
        path="stories"
        Component={UserPublish}
        query={userPublishedQuery}
        prepareVariables={() => ({ token: localStorage.getItem('token') })}
      />
      <Route
        path="followed"
        // Component={UserFollowed}
        query={userFollowedQuery}
        prepareVariables={() => ({
          token: localStorage.getItem('token'),
          first: 1
        })}
        render={({ error, props }) => {
          if (error) {
            return <div>Error!</div>;
          }
          if (!props) {
            return <div>loading</div>;
          }
          return <UserFollowed {...props} environment={environment} />;
        }}
      />
    </Route>
  </Route>
);

// const errRender = ({ error }) => {
//   console.log(error);
//   return <div>{error.status === 404 ? 'Not found' : 'Error'}</div>;
// };
// errRender.propTypes = {
//   error: PropTypes.object
// };

export default createFarceRouter({
  historyProtocol: new HashProtocol(),
  historyMiddlewares: [queryMiddleware],
  routeConfig: electronRouteConfig
});
