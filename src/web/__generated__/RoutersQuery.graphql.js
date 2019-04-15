/**
 * @flow
 * @relayHash 52e8fca1def8985bb0689862782c6f64
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
type Container_user$ref = any;
export type RoutersQueryVariables = {||};
export type RoutersQueryResponse = {|
  +user: ?{|
    +$fragmentRefs: Container_user$ref
  |}
|};
export type RoutersQuery = {|
  variables: RoutersQueryVariables,
  response: RoutersQueryResponse,
|};
*/


/*
query RoutersQuery {
  user: auth {
    ...Container_user
    id
  }
}

fragment Container_user on User {
  id
  avator
  nickname
}
*/

const node/*: ConcreteRequest*/ = {
  "kind": "Request",
  "fragment": {
    "kind": "Fragment",
    "name": "RoutersQuery",
    "type": "Query",
    "metadata": null,
    "argumentDefinitions": [],
    "selections": [
      {
        "kind": "LinkedField",
        "alias": "user",
        "name": "auth",
        "storageKey": null,
        "args": null,
        "concreteType": "User",
        "plural": false,
        "selections": [
          {
            "kind": "FragmentSpread",
            "name": "Container_user",
            "args": null
          }
        ]
      }
    ]
  },
  "operation": {
    "kind": "Operation",
    "name": "RoutersQuery",
    "argumentDefinitions": [],
    "selections": [
      {
        "kind": "LinkedField",
        "alias": "user",
        "name": "auth",
        "storageKey": null,
        "args": null,
        "concreteType": "User",
        "plural": false,
        "selections": [
          {
            "kind": "ScalarField",
            "alias": null,
            "name": "id",
            "args": null,
            "storageKey": null
          },
          {
            "kind": "ScalarField",
            "alias": null,
            "name": "avator",
            "args": null,
            "storageKey": null
          },
          {
            "kind": "ScalarField",
            "alias": null,
            "name": "nickname",
            "args": null,
            "storageKey": null
          }
        ]
      }
    ]
  },
  "params": {
    "operationKind": "query",
    "name": "RoutersQuery",
    "id": null,
    "text": "query RoutersQuery {\n  user: auth {\n    ...Container_user\n    id\n  }\n}\n\nfragment Container_user on User {\n  id\n  avator\n  nickname\n}\n",
    "metadata": {}
  }
};
// prettier-ignore
(node/*: any*/).hash = '14ed45c098a77dfe17ed25ebdede837a';
module.exports = node;
