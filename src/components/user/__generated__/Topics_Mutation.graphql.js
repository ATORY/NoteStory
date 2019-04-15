/**
 * @flow
 * @relayHash a1d40ecb2fa643d6b6016333a66e619d
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type TopicInput = {|
  title: string,
  snapImg: string,
  intro: string,
  stories?: ?$ReadOnlyArray<?string>,
|};
export type Topics_MutationVariables = {|
  input: TopicInput
|};
export type Topics_MutationResponse = {|
  +createTopic: ?{|
    +id: string
  |}
|};
export type Topics_Mutation = {|
  variables: Topics_MutationVariables,
  response: Topics_MutationResponse,
|};
*/


/*
mutation Topics_Mutation(
  $input: TopicInput!
) {
  createTopic(input: $input) {
    id
  }
}
*/

const node/*: ConcreteRequest*/ = (function(){
var v0 = [
  {
    "kind": "LocalArgument",
    "name": "input",
    "type": "TopicInput!",
    "defaultValue": null
  }
],
v1 = [
  {
    "kind": "LinkedField",
    "alias": null,
    "name": "createTopic",
    "storageKey": null,
    "args": [
      {
        "kind": "Variable",
        "name": "input",
        "variableName": "input"
      }
    ],
    "concreteType": "Topic",
    "plural": false,
    "selections": [
      {
        "kind": "ScalarField",
        "alias": null,
        "name": "id",
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
    "name": "Topics_Mutation",
    "type": "Mutation",
    "metadata": null,
    "argumentDefinitions": (v0/*: any*/),
    "selections": (v1/*: any*/)
  },
  "operation": {
    "kind": "Operation",
    "name": "Topics_Mutation",
    "argumentDefinitions": (v0/*: any*/),
    "selections": (v1/*: any*/)
  },
  "params": {
    "operationKind": "mutation",
    "name": "Topics_Mutation",
    "id": null,
    "text": "mutation Topics_Mutation(\n  $input: TopicInput!\n) {\n  createTopic(input: $input) {\n    id\n  }\n}\n",
    "metadata": {}
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = 'd301e4004d8f305c24a8f55835932deb';
module.exports = node;
