/**
 * @flow
 * @relayHash 5c469a317e7d1ee606120cbcb30c9265
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type InfoLittle_MutationVariables = {||};
export type InfoLittle_MutationResponse = {|
  +token: ?any
|};
export type InfoLittle_Mutation = {|
  variables: InfoLittle_MutationVariables,
  response: InfoLittle_MutationResponse,
|};
*/


/*
mutation InfoLittle_Mutation {
  token: userLogout
}
*/

const node/*: ConcreteRequest*/ = (function(){
var v0 = [
  {
    "kind": "ScalarField",
    "alias": "token",
    "name": "userLogout",
    "args": null,
    "storageKey": null
  }
];
return {
  "kind": "Request",
  "fragment": {
    "kind": "Fragment",
    "name": "InfoLittle_Mutation",
    "type": "Mutation",
    "metadata": null,
    "argumentDefinitions": [],
    "selections": (v0/*: any*/)
  },
  "operation": {
    "kind": "Operation",
    "name": "InfoLittle_Mutation",
    "argumentDefinitions": [],
    "selections": (v0/*: any*/)
  },
  "params": {
    "operationKind": "mutation",
    "name": "InfoLittle_Mutation",
    "id": null,
    "text": "mutation InfoLittle_Mutation {\n  token: userLogout\n}\n",
    "metadata": {}
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = '89dc4e22ba53b1b6a32c2f4b3612d974';
module.exports = node;
