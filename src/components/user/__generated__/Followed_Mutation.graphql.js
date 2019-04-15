/**
 * @flow
 * @relayHash a0500b55fc8f46818dfd79d09de19497
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type Followed_MutationVariables = {|
  token: any,
  openId: string,
  follow: boolean,
|};
export type Followed_MutationResponse = {|
  +followed: ?{|
    +id: string,
    +hasFollow: ?boolean,
  |}
|};
export type Followed_Mutation = {|
  variables: Followed_MutationVariables,
  response: Followed_MutationResponse,
|};
*/


/*
mutation Followed_Mutation(
  $token: Token!
  $openId: String!
  $follow: Boolean!
) {
  followed: userAddFollow(token: $token, openId: $openId, follow: $follow) {
    id
    hasFollow
  }
}
*/

const node/*: ConcreteRequest*/ = (function(){
var v0 = [
  {
    "kind": "LocalArgument",
    "name": "token",
    "type": "Token!",
    "defaultValue": null
  },
  {
    "kind": "LocalArgument",
    "name": "openId",
    "type": "String!",
    "defaultValue": null
  },
  {
    "kind": "LocalArgument",
    "name": "follow",
    "type": "Boolean!",
    "defaultValue": null
  }
],
v1 = [
  {
    "kind": "LinkedField",
    "alias": "followed",
    "name": "userAddFollow",
    "storageKey": null,
    "args": [
      {
        "kind": "Variable",
        "name": "follow",
        "variableName": "follow"
      },
      {
        "kind": "Variable",
        "name": "openId",
        "variableName": "openId"
      },
      {
        "kind": "Variable",
        "name": "token",
        "variableName": "token"
      }
    ],
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
        "name": "hasFollow",
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
    "name": "Followed_Mutation",
    "type": "Mutation",
    "metadata": null,
    "argumentDefinitions": (v0/*: any*/),
    "selections": (v1/*: any*/)
  },
  "operation": {
    "kind": "Operation",
    "name": "Followed_Mutation",
    "argumentDefinitions": (v0/*: any*/),
    "selections": (v1/*: any*/)
  },
  "params": {
    "operationKind": "mutation",
    "name": "Followed_Mutation",
    "id": null,
    "text": "mutation Followed_Mutation(\n  $token: Token!\n  $openId: String!\n  $follow: Boolean!\n) {\n  followed: userAddFollow(token: $token, openId: $openId, follow: $follow) {\n    id\n    hasFollow\n  }\n}\n",
    "metadata": {}
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = 'a5c4a5828058a40c8b8d532e90912878';
module.exports = node;
