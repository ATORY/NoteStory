/**
 * @flow
 * @relayHash ccccdb366157a21cf6b8bf2a2f7e7b31
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type Container_user_QueryVariables = {||};
export type Container_user_QueryResponse = {|
  +user: ?{|
    +id: string,
    +nickname: ?string,
    +avator: ?string,
  |}
|};
export type Container_user_Query = {|
  variables: Container_user_QueryVariables,
  response: Container_user_QueryResponse,
|};
*/


/*
query Container_user_Query {
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
    "name": "Container_user_Query",
    "type": "Query",
    "metadata": null,
    "argumentDefinitions": [],
    "selections": (v0/*: any*/)
  },
  "operation": {
    "kind": "Operation",
    "name": "Container_user_Query",
    "argumentDefinitions": [],
    "selections": (v0/*: any*/)
  },
  "params": {
    "operationKind": "query",
    "name": "Container_user_Query",
    "id": null,
    "text": "query Container_user_Query {\n  user: auth {\n    id\n    nickname\n    avator\n  }\n}\n",
    "metadata": {}
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = 'e9b3e6effbd090d3e362b88fb5c700e2';
module.exports = node;
