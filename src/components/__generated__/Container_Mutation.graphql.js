/**
 * @flow
 * @relayHash 31bff73ee989799d5a77a0624c614860
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type Container_MutationVariables = {||};
export type Container_MutationResponse = {|
  +token: ?any
|};
export type Container_Mutation = {|
  variables: Container_MutationVariables,
  response: Container_MutationResponse,
|};
*/


/*
mutation Container_Mutation {
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
    "name": "Container_Mutation",
    "type": "Mutation",
    "metadata": null,
    "argumentDefinitions": [],
    "selections": (v0/*: any*/)
  },
  "operation": {
    "kind": "Operation",
    "name": "Container_Mutation",
    "argumentDefinitions": [],
    "selections": (v0/*: any*/)
  },
  "params": {
    "operationKind": "mutation",
    "name": "Container_Mutation",
    "id": null,
    "text": "mutation Container_Mutation {\n  token: userLogout\n}\n",
    "metadata": {}
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = '85b1fcafc00099a8e538ecd6c2407693';
module.exports = node;
