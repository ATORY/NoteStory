/**
 * @flow
 * @relayHash 03d22dca12446c021a2a6311d70a38e6
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
export type Topics_Update_MutationVariables = {|
  id: string,
  input: TopicInput,
|};
export type Topics_Update_MutationResponse = {|
  +updateTopic: ?{|
    +id: string
  |}
|};
export type Topics_Update_Mutation = {|
  variables: Topics_Update_MutationVariables,
  response: Topics_Update_MutationResponse,
|};
*/


/*
mutation Topics_Update_Mutation(
  $id: ID!
  $input: TopicInput!
) {
  updateTopic(id: $id, input: $input) {
    id
  }
}
*/

const node/*: ConcreteRequest*/ = (function(){
var v0 = [
  {
    "kind": "LocalArgument",
    "name": "id",
    "type": "ID!",
    "defaultValue": null
  },
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
    "name": "updateTopic",
    "storageKey": null,
    "args": [
      {
        "kind": "Variable",
        "name": "id",
        "variableName": "id"
      },
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
    "name": "Topics_Update_Mutation",
    "type": "Mutation",
    "metadata": null,
    "argumentDefinitions": (v0/*: any*/),
    "selections": (v1/*: any*/)
  },
  "operation": {
    "kind": "Operation",
    "name": "Topics_Update_Mutation",
    "argumentDefinitions": (v0/*: any*/),
    "selections": (v1/*: any*/)
  },
  "params": {
    "operationKind": "mutation",
    "name": "Topics_Update_Mutation",
    "id": null,
    "text": "mutation Topics_Update_Mutation(\n  $id: ID!\n  $input: TopicInput!\n) {\n  updateTopic(id: $id, input: $input) {\n    id\n  }\n}\n",
    "metadata": {}
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = '7fab27b071ae8e777e8f25a3d20d94ef';
module.exports = node;
