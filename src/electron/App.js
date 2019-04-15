import React from 'react';
import { Resolver } from 'found-relay';
// import { QueryRenderer, graphql } from 'react-relay';

import { Environment, Network, RecordSource, Store } from 'relay-runtime';

import headersGen from 'cover/headersGen';
import Router from './Routers';

export const store = new Store(new RecordSource());

async function fetchQuery(
  operation,
  variables
  // cacheConfig
) {
  const headers = headersGen();
  const response = await fetch(
    `${process.env.NOTESTORY_APP_SERVER_URI}/graphql`,
    {
      method: 'POST',
      headers,
      body: JSON.stringify({
        query: operation.text,
        variables
      })
    }
  );
  const responeData = await response.json();
  const { errors } = responeData;
  if (errors) throw errors[0]; // errors handle

  return responeData;
}

export const environment = new Environment({
  network: Network.create(fetchQuery),
  store
});

export default class App extends React.Component {
  render() {
    return <Router resolver={new Resolver(environment)} />;
  }
}
