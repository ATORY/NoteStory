/**
 * @flow
 * @relayHash ec92df8cc38f2b774db2c39863038190
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type UserInfoInput = {|
  nickname?: ?string,
  intro?: ?string,
  banner?: ?string,
  avator?: ?string,
|};
export type Info_BaseIbfo_MutationVariables = {|
  token: any,
  input?: ?UserInfoInput,
|};
export type Info_BaseIbfo_MutationResponse = {|
  +userInfoUpdate: ?boolean
|};
export type Info_BaseIbfo_Mutation = {|
  variables: Info_BaseIbfo_MutationVariables,
  response: Info_BaseIbfo_MutationResponse,
|};
*/


/*
mutation Info_BaseIbfo_Mutation(
  $token: Token!
  $input: UserInfoInput
) {
  userInfoUpdate(token: $token, input: $input)
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
    "name": "input",
    "type": "UserInfoInput",
    "defaultValue": null
  }
],
v1 = [
  {
    "kind": "ScalarField",
    "alias": null,
    "name": "userInfoUpdate",
    "args": [
      {
        "kind": "Variable",
        "name": "input",
        "variableName": "input"
      },
      {
        "kind": "Variable",
        "name": "token",
        "variableName": "token"
      }
    ],
    "storageKey": null
  }
];
return {
  "kind": "Request",
  "fragment": {
    "kind": "Fragment",
    "name": "Info_BaseIbfo_Mutation",
    "type": "Mutation",
    "metadata": null,
    "argumentDefinitions": (v0/*: any*/),
    "selections": (v1/*: any*/)
  },
  "operation": {
    "kind": "Operation",
    "name": "Info_BaseIbfo_Mutation",
    "argumentDefinitions": (v0/*: any*/),
    "selections": (v1/*: any*/)
  },
  "params": {
    "operationKind": "mutation",
    "name": "Info_BaseIbfo_Mutation",
    "id": null,
    "text": "mutation Info_BaseIbfo_Mutation(\n  $token: Token!\n  $input: UserInfoInput\n) {\n  userInfoUpdate(token: $token, input: $input)\n}\n",
    "metadata": {}
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = '24bd53128e8f0278bcd99d1f7bcfe640';
module.exports = node;
