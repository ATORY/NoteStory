/* eslint-disable relay/unused-fields */
// import React from 'react';
// import { Resolver } from 'found-relay';
// import { QueryRenderer, graphql } from 'react-relay';
import { Environment, Network, RecordSource, Store } from 'relay-runtime';
// import RelayQueryResponseCache from 'relay-runtime/lib/RelayQueryResponseCache';
// import {ConnectionHandler} from 'relay-runtime';

// import Router from './Routers';

export const store = new Store(new RecordSource());
// const oneMinute = 60 * 1000;
// const cache = new RelayQueryResponseCache({ size: 250, ttl: oneMinute });

// eslint-disable-next-line no-unused-vars
async function fetchQuery(operation, variables, cacheConfig) {
  // const queryID = operation.text;
  // // console.log('operation', operation);
  // const isMutation = operation.operationKind === 'mutation';
  // const isQuery = operation.operationKind === 'query';
  // const forceFetch = cacheConfig && cacheConfig.force;

  // // Try to get data from cache on queries
  // const fromCache = cache.get(queryID, variables);
  // // console.log(queryID, variables, 'fromCache', fromCache, forceFetch);
  // if (isQuery && fromCache !== null && !forceFetch) {
  //   console.log('fromCache..');
  //   return fromCache;
  // }

  const authorization = localStorage.getItem('token')
    ? `Bearer ${
        // process.env.NODE_ENV === 'development' || process.browser
        localStorage.getItem('token')
        // : req.cookies.token
      }`
    : '';
  const headers = {
    'Content-Type': 'application/json',
    'x-client-name': `${process.env.REACT_APP_NAME}@web`,
    'x-client-version': process.env.REACT_APP_VERSION
  };
  if (authorization) {
    headers.authorization = authorization;
  }
  const response = await fetch('/graphql', {
    method: 'POST',
    headers,
    body: JSON.stringify({
      query: operation.text,
      variables
    })
  });
  const responeData = await response.json();
  const { data, errors } = responeData;
  if (errors) throw errors[0]; // errors handle
  if (data.auth !== undefined) {
    console.log('data', data);
    localStorage.setItem('token', data.auth);
  }
  // if (isQuery && responeData) {
  //   cache.set(queryID, variables, responeData);
  // }
  // // Clear cache on mutations
  // console.log(cache);
  // if (isMutation) {
  //   cache.clear();
  // }

  return responeData;
}

export const environment = new Environment({
  network: Network.create(fetchQuery),
  store
});

// export default class App extends React.Component {
//   render() {
//     return <Router resolver={new Resolver(environment)} />;
// return (
//   <QueryRenderer
//     environment={environment}
//     query={graphql`
//       query AppQuery {
//         user: auth {
//           avator
//           nickname
//         }
//       }
//     `}
//     render={({ error, props }) => {
//       if (error) {
//         return <Router resolver={new Resolver(environment)} />;
//         // return <div>{error.message}</div>;
//       }
//       if (!props) {
//         return <div>Loading</div>;
//         // return <div>{props.page.name} is great!</div>;
//       }
//       return <Router resolver={new Resolver(environment)} />;
//     }}
//   />
// );
//   }
// }
