/* eslint-disable no-unused-vars */
import React from 'react';
import PropTypes from 'prop-types';
import { BrowserProtocol, queryMiddleware } from 'farce';
import {
  createFarceRouter,
  createRender,
  makeRouteConfig,
  Route,
  Redirect,
  RedirectException
} from 'found';
import { graphql } from 'react-relay';
// import Application from 'App';

import MainContainer from 'components/Common/Main';
import Home, { query as HomeQuery, countLoad } from 'components/Home';
import All, { query as AllQuery } from 'components/All';
import Topic, { query as TopicQuery } from 'components/Topic';
import TopicInfo, { query as TopicInfoQuery } from 'components/TopicInfo';
import { query as userPublishedQuery } from 'components/user/Publish';
import { query as userFollowedQuery } from 'components/user/Followed';
import { query as userTopicsQuery } from 'components/user/Topics';
import Container from 'components/Container';
import OtherUser, { query as OtherQuery } from 'components/user/Other';
import User, {
  UserInfo,
  UserPublish,
  UserFollowed,
  UserTopics
} from 'components/user/index';

import Story from 'components/Story';
import Loading from 'components/utils/Loading';

import { environment } from './App';
import StoryClient from 'components/StoryClient';

const webRouteConfig = makeRouteConfig(
  <Route>
    <Route
      path="/"
      environment={environment}
      query={graphql`
        query RoutersQuery {
          user: auth {
            ...Container_user
          }
        }
      `}
      Component={Container}
    >
      <Route
        query={HomeQuery}
        prepareVariables={() => ({ after: '', first: countLoad, page: 0 })}
        cacheConfig={{
          force: false
        }}
        render={({ error, props }) => {
          // console.log(',,,,,', error, props);
          if (error) {
            return <MainContainer>Error!</MainContainer>;
          }
          if (!props) {
            return (
              <MainContainer>
                <div
                  style={{
                    textAlign: 'center',
                    width: '100%',
                    paddingTop: '50px'
                  }}
                >
                  <Loading height="15%" width="15%" />
                </div>
              </MainContainer>
            );
          }
          return <Home {...props} />;
        }}
      />
      <Route
        path="story/:id"
        Component={Story}
        query={graphql`
          query RoutersStoryQuery($id: ID!, $local: Boolean) {
            story: storyInfo(id: $id, local: $local) {
              ...Story_story
            }
          }
        `}
        prepareVariables={params => {
          // console.log(params);
          return { ...params, status: 'any', userId: '2' };
        }}
      />
      <Route
        path="topic"
        query={TopicQuery}
        prepareVariables={() => ({ after: '', first: countLoad, page: 0 })}
        render={({ error, props }) => {
          if (error) {
            return <MainContainer>Error!</MainContainer>;
          }
          if (!props) {
            return (
              <MainContainer>
                <div
                  style={{
                    textAlign: 'center',
                    width: '100%',
                    paddingTop: '50px'
                  }}
                >
                  <Loading height="15%" width="15%" />
                </div>
              </MainContainer>
            );
          }
          return <Topic {...props} />;
        }}
      />
      <Route
        path="topic/:id"
        Component={TopicInfo}
        query={TopicInfoQuery}
        prepareVariables={params => {
          console.log(params);
          return { ...params };
        }}
      />
      {/* <Route path="explore" Component={Explore} /> */}
      <Route
        path="all"
        query={AllQuery}
        prepareVariables={() => ({ after: '', first: countLoad, page: 0 })}
        cacheConfig={{
          force: false
        }}
        render={({ error, props }) => {
          // console.log(',,,,,', error, props);
          if (error) {
            return <MainContainer>Error!</MainContainer>;
          }
          if (!props) {
            return (
              <MainContainer>
                <div
                  style={{
                    textAlign: 'center',
                    width: '100%',
                    paddingTop: '50px'
                  }}
                >
                  <Loading height="15%" width="15%" />
                </div>
              </MainContainer>
            );
          }
          return <All {...props} />;
        }}
      />
      <Route
        path="user/:openId"
        Component={OtherUser}
        query={OtherQuery}
        prepareVariables={params => {
          console.log(params);
          return { ...params, after: '', first: 10, page: 0 };
        }}
      />
    </Route>
    {/* <Route path="center" Component={UserCenter} /> */}
    {/** client 使用页面 */}
    <Route
      path="/story/client/:id"
      Component={StoryClient}
      query={graphql`
        query RoutersStoryClientQuery($id: ID!, $local: Boolean) {
          story: storyInfo(id: $id, local: $local) {
            ...StoryClient_story
          }
        }
      `}
      prepareVariables={params => {
        // console.log(params);
        return { ...params, status: 'any', userId: '2' };
      }}
    />
    <Route
      path="/center"
      prepareVariables={() => ({
        token: localStorage.getItem('token'),
        after: '',
        first: countLoad,
        page: 0
      })}
      query={graphql`
        query RoutersUserQuery($token: String!) {
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
      <Route
        render={({ error, props }) => {
          if (error) {
            return <div>Error!</div>;
          }
          if (!props) {
            return <div>loading</div>;
          }
          return <UserInfo {...props} environment={environment} />;
        }}
      />
      {/* <Route Component={React.cloneElement(UserInfo, { environment })} /> */}
      <Route
        path="stories"
        Component={UserPublish}
        query={userPublishedQuery}
        prepareVariables={() => ({
          token: localStorage.getItem('token')
        })}
      />
      <Route
        path="followed"
        // Component={UserFollowed}
        query={userFollowedQuery}
        prepareVariables={() => ({
          token: localStorage.getItem('token'),
          first: 10
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
      <Route
        path="topics"
        query={userTopicsQuery}
        prepareVariables={() => ({
          token: localStorage.getItem('token'),
          first: 10
        })}
        render={({ error, props }) => {
          if (error) {
            return <div>Error!</div>;
          }
          if (!props) {
            return <div>loading</div>;
          }
          return <UserTopics environment={environment} {...props} />;
        }}
      />
    </Route>
  </Route>
);

const errRender = ({ error }) => {
  console.log(error);
  return <div>{error.status === 404 ? 'Not found' : 'Error'}</div>;
};
errRender.propTypes = {
  error: PropTypes.object
};

export default createFarceRouter({
  historyProtocol: new BrowserProtocol(),
  historyMiddlewares: [queryMiddleware],
  routeConfig: webRouteConfig,

  render: createRender({
    renderError: errRender
  })
});

// path="/"
// Component={Application}
// query={graphql`
//   query RouterQuery($userId: String!) {
//     userProfile(id: $userId) {
//       id
//     }
//   }
// `}
// prepareVariables={() => {
//   // console.log(params, match)
//   return { userId: "1" }
// }}
// // defer
// render={({ props }) => {
//   console.log('-->>', props)
//   if (props) {
//     return <Application {...props} />
//   } else {
//     return <div>Loading...</div>
//   }
// }}
// render({ Component, props }) {
//   if (!props) return null
//   if (Component && props && props.viewer) {
//     throw new RedirectException('/')
//   }
//   return (<Component {...props} />)
// }
// render={({Component, props}) => {
//   console.log('->>', props)
//   // return (<Component {...props} />)
//   if (Component) {
//     return <div>Error!</div>;
//   }
//   if (!props) {
//     return <div>Loading...</div>;
//   }
//   // return <div>User ID: {props.userProfile.id}</div>;
//   return (
//     <Application {...props} />
//   )
// }}
