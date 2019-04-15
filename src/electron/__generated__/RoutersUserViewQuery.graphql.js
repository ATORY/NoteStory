/**
 * @flow
 * @relayHash e42a819ea7e0a0319b975cd5b3da8d62
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
type user_userInfo$ref = any;
export type RoutersUserViewQueryVariables = {|
  token: string
|};
export type RoutersUserViewQueryResponse = {|
  +userInfo: ?{|
    +$fragmentRefs: user_userInfo$ref
  |}
|};
export type RoutersUserViewQuery = {|
  variables: RoutersUserViewQueryVariables,
  response: RoutersUserViewQueryResponse,
|};
*/


/*
query RoutersUserViewQuery(
  $token: String!
) {
  userInfo(token: $token) {
    ...user_userInfo
    id
  }
}

fragment user_userInfo on User {
  id
  avator
  banner
  intro
  nickname
}
*/

const node/*: ConcreteRequest*/ = (function(){
var v0 = [
  {
    "kind": "LocalArgument",
    "name": "token",
    "type": "String!",
    "defaultValue": null
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "token",
    "variableName": "token"
  }
];
return {
  "kind": "Request",
  "fragment": {
    "kind": "Fragment",
    "name": "RoutersUserViewQuery",
    "type": "Query",
    "metadata": null,
    "argumentDefinitions": (v0/*: any*/),
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "userInfo",
        "storageKey": null,
        "args": (v1/*: any*/),
        "concreteType": "User",
        "plural": false,
        "selections": [
          {
            "kind": "FragmentSpread",
            "name": "user_userInfo",
            "args": null
          }
        ]
      }
    ]
  },
  "operation": {
    "kind": "Operation",
    "name": "RoutersUserViewQuery",
    "argumentDefinitions": (v0/*: any*/),
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "userInfo",
        "storageKey": null,
        "args": (v1/*: any*/),
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
            "name": "banner",
            "args": null,
            "storageKey": null
          },
          {
            "kind": "ScalarField",
            "alias": null,
            "name": "intro",
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
    "name": "RoutersUserViewQuery",
    "id": null,
    "text": "query RoutersUserViewQuery(\n  $token: String!\n) {\n  userInfo(token: $token) {\n    ...user_userInfo\n    id\n  }\n}\n\nfragment user_userInfo on User {\n  id\n  avator\n  banner\n  intro\n  nickname\n}\n",
    "metadata": {}
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = '0a946f7e083948b388e3be95614d1da7';
module.exports = node;
