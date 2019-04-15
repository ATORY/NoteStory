/**
 * @flow
 * @relayHash cccf2aa3b24f60b1b4e86fcb8e12f97b
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
export type SignIn_QueryVariables = {|
  input?: ?UserInput
|};
export type SignIn_QueryResponse = {|
  +token: ?any
|};
export type SignIn_Query = {|
  variables: SignIn_QueryVariables,
  response: SignIn_QueryResponse,
|};
*/


/*
query SignIn_Query(
  $input: UserInput
) {
  token: userLogin(input: $input)
}
*/

const node/*: ConcreteRequest*/ = (function(){
var v0 = [
  {
    "kind": "LocalArgument",
    "name": "input",
    "type": "UserInput",
    "defaultValue": null
  }
],
v1 = [
  {
    "kind": "ScalarField",
    "alias": "token",
    "name": "userLogin",
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
    "name": "SignIn_Query",
    "type": "Query",
    "metadata": null,
    "argumentDefinitions": (v0/*: any*/),
    "selections": (v1/*: any*/)
  },
  "operation": {
    "kind": "Operation",
    "name": "SignIn_Query",
    "argumentDefinitions": (v0/*: any*/),
    "selections": (v1/*: any*/)
  },
  "params": {
    "operationKind": "query",
    "name": "SignIn_Query",
    "id": null,
    "text": "query SignIn_Query(\n  $input: UserInput\n) {\n  token: userLogin(input: $input)\n}\n",
    "metadata": {}
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = '4dc460faafc008653307153108006d65';
module.exports = node;
