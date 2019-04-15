/**
 * @flow
 * @relayHash 994f6114ed326999824195b96bc7aa9a
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type Story_addFlow_MutationVariables = {|
  token: any,
  openId: string,
  follow: boolean,
|};
export type Story_addFlow_MutationResponse = {|
  +followed: ?{|
    +id: string,
    +hasFollow: ?boolean,
  |}
|};
export type Story_addFlow_Mutation = {|
  variables: Story_addFlow_MutationVariables,
  response: Story_addFlow_MutationResponse,
|};
*/


/*
mutation Story_addFlow_Mutation(
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
    "name": "Story_addFlow_Mutation",
    "type": "Mutation",
    "metadata": null,
    "argumentDefinitions": (v0/*: any*/),
    "selections": (v1/*: any*/)
  },
  "operation": {
    "kind": "Operation",
    "name": "Story_addFlow_Mutation",
    "argumentDefinitions": (v0/*: any*/),
    "selections": (v1/*: any*/)
  },
  "params": {
    "operationKind": "mutation",
    "name": "Story_addFlow_Mutation",
    "id": null,
    "text": "mutation Story_addFlow_Mutation(\n  $token: Token!\n  $openId: String!\n  $follow: Boolean!\n) {\n  followed: userAddFollow(token: $token, openId: $openId, follow: $follow) {\n    id\n    hasFollow\n  }\n}\n",
    "metadata": {}
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = '002e90ceef28010cd6948e3b6e48564c';
module.exports = node;
