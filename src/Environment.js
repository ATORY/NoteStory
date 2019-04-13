import {
  Environment,
  Network,
  RecordSource,
  Store,
} from 'relay-runtime';

import root from 'window-or-global'

function fetchQuery(
  operation,
  variables,
) {
  return fetch(root.isElectron ? 'http://localhost:3030/graphql' : '/graphql', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query: operation.text,
      variables,
    }),
  }).then(response => {
    return response.json();
  });
}

const environment = new Environment({
  network: Network.create(fetchQuery),
  store: new Store(new RecordSource()),  
});

export default environment;
