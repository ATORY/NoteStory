/**
 * @flow
 * @relayHash 0ae86d54969da3e41364ebeb6d11dbb9
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type electron_user_QueryVariables = {||};
export type electron_user_QueryResponse = {|
  +user: ?{|
    +id: string,
    +nickname: ?string,
    +avator: ?string,
  |}
|};
export type electron_user_Query = {|
  variables: electron_user_QueryVariables,
  response: electron_user_QueryResponse,
|};
*/


/*
query electron_user_Query {
  user: auth {
    id
    nickname
    avator
  }
}
*/

const node/*: ConcreteRequest*/ = (function(){
var v0 = [
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
        "name": "nickname",
        "args": null,
        "storageKey": null
      },
      {
        "kind": "ScalarField",
        "alias": null,
        "name": "avator",
        "args": null,
        "storageKey": null
      }
    ]
  }
];
return {
  "kind": "Request",
  "fragment": {
    "kind": "Fragment",
    "name": "electron_user_Query",
    "type": "Query",
    "metadata": null,
    "argumentDefinitions": [],
    "selections": (v0/*: any*/)
  },
  "operation": {
    "kind": "Operation",
    "name": "electron_user_Query",
    "argumentDefinitions": [],
    "selections": (v0/*: any*/)
  },
  "params": {
    "operationKind": "query",
    "name": "electron_user_Query",
    "id": null,
    "text": "query electron_user_Query {\n  user: auth {\n    id\n    nickname\n    avator\n  }\n}\n",
    "metadata": {}
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = 'e9a335b096341e531afb6a9de73ea8cd';
module.exports = node;
