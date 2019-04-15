/**
 * @flow
 * @relayHash 76bbbfca714795296edcb6659bfb0d63
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type UserInfoQueryVariables = {||};
export type UserInfoQueryResponse = {|
  +userProfile: ?{|
    +id: string,
    +email: ?string,
  |}
|};
export type UserInfoQuery = {|
  variables: UserInfoQueryVariables,
  response: UserInfoQueryResponse,
|};
*/


/*
query UserInfoQuery {
  userProfile {
    id
    email
  }
}
*/

const node/*: ConcreteRequest*/ = (function(){
var v0 = [
  {
    "kind": "LinkedField",
    "alias": null,
    "name": "userProfile",
    "storageKey": null,
    "args": null,
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
        "name": "email",
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
    "name": "UserInfoQuery",
    "type": "Query",
    "metadata": null,
    "argumentDefinitions": [],
    "selections": (v0/*: any*/)
  },
  "operation": {
    "kind": "Operation",
    "name": "UserInfoQuery",
    "argumentDefinitions": [],
    "selections": (v0/*: any*/)
  },
  "params": {
    "operationKind": "query",
    "name": "UserInfoQuery",
    "id": null,
    "text": "query UserInfoQuery {\n  userProfile {\n    id\n    email\n  }\n}\n",
    "metadata": {}
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = 'c760952356d15e1478b0304528d7223e';
module.exports = node;
