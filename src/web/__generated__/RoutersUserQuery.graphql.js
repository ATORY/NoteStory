/**
 * @flow
 * @relayHash 0fd26c57fb83ced1c382e18cd662b87a
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
type user_userInfo$ref = any;
export type RoutersUserQueryVariables = {|
  token: string
|};
export type RoutersUserQueryResponse = {|
  +userInfo: ?{|
    +$fragmentRefs: user_userInfo$ref
  |}
|};
export type RoutersUserQuery = {|
  variables: RoutersUserQueryVariables,
  response: RoutersUserQueryResponse,
|};
*/


/*
query RoutersUserQuery(
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
    "name": "RoutersUserQuery",
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
    "name": "RoutersUserQuery",
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
    "name": "RoutersUserQuery",
    "id": null,
    "text": "query RoutersUserQuery(\n  $token: String!\n) {\n  userInfo(token: $token) {\n    ...user_userInfo\n    id\n  }\n}\n\nfragment user_userInfo on User {\n  id\n  avator\n  banner\n  intro\n  nickname\n}\n",
    "metadata": {}
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = 'fc2983159ddbb4aecb415b5f9ed6e582';
module.exports = node;
