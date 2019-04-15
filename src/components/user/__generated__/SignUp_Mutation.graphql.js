/**
 * @flow
 * @relayHash 02c8decba1a90de94aa2c4bffd18642e
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type UserInput = {|
  email?: ?string,
  password?: ?string,
  passwordRe?: ?string,
  oldPassword?: ?string,
|};
export type SignUp_MutationVariables = {|
  input: UserInput
|};
export type SignUp_MutationResponse = {|
  +token: ?any
|};
export type SignUp_Mutation = {|
  variables: SignUp_MutationVariables,
  response: SignUp_MutationResponse,
|};
*/


/*
mutation SignUp_Mutation(
  $input: UserInput!
) {
  token: userRegister(input: $input)
}
*/

const node/*: ConcreteRequest*/ = (function(){
var v0 = [
  {
    "kind": "LocalArgument",
    "name": "input",
    "type": "UserInput!",
    "defaultValue": null
  }
],
v1 = [
  {
    "kind": "ScalarField",
    "alias": "token",
    "name": "userRegister",
    "args": [
      {
        "kind": "Variable",
        "name": "input",
        "variableName": "input"
      }
    ],
    "storageKey": null
  }
];
return {
  "kind": "Request",
  "fragment": {
    "kind": "Fragment",
    "name": "SignUp_Mutation",
    "type": "Mutation",
    "metadata": null,
    "argumentDefinitions": (v0/*: any*/),
    "selections": (v1/*: any*/)
  },
  "operation": {
    "kind": "Operation",
    "name": "SignUp_Mutation",
    "argumentDefinitions": (v0/*: any*/),
    "selections": (v1/*: any*/)
  },
  "params": {
    "operationKind": "mutation",
    "name": "SignUp_Mutation",
    "id": null,
    "text": "mutation SignUp_Mutation(\n  $input: UserInput!\n) {\n  token: userRegister(input: $input)\n}\n",
    "metadata": {}
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = '56cf9768b2656a02ce3d9b72fe3f9b55';
module.exports = node;
