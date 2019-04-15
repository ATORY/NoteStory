/**
 * @flow
 * @relayHash 198a6d30c4748251b57ac41869ead273
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type Other_addFlow_MutationVariables = {|
  token: any,
  openId: string,
  follow: boolean,
|};
export type Other_addFlow_MutationResponse = {|
  +followed: ?{|
    +id: string,
    +hasFollow: ?boolean,
  |}
|};
export type Other_addFlow_Mutation = {|
  variables: Other_addFlow_MutationVariables,
  response: Other_addFlow_MutationResponse,
|};
*/


/*
mutation Other_addFlow_Mutation(
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
    "name": "Other_addFlow_Mutation",
    "type": "Mutation",
    "metadata": null,
    "argumentDefinitions": (v0/*: any*/),
    "selections": (v1/*: any*/)
  },
  "operation": {
    "kind": "Operation",
    "name": "Other_addFlow_Mutation",
    "argumentDefinitions": (v0/*: any*/),
    "selections": (v1/*: any*/)
  },
  "params": {
    "operationKind": "mutation",
    "name": "Other_addFlow_Mutation",
    "id": null,
    "text": "mutation Other_addFlow_Mutation(\n  $token: Token!\n  $openId: String!\n  $follow: Boolean!\n) {\n  followed: userAddFollow(token: $token, openId: $openId, follow: $follow) {\n    id\n    hasFollow\n  }\n}\n",
    "metadata": {}
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = '93f958cc4052abe17cb053b27f190f25';
module.exports = node;
