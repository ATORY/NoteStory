/**
 * @flow
 * @relayHash 83087abffba97207eb9f5008edb143b0
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type StoryInput = {|
  clientId: string,
  title: string,
  content: string,
  wordCount: number,
  intro?: ?string,
  md5: string,
  key: string,
  label?: ?string,
  time?: ?string,
  lastUpdateTime?: ?string,
|};
export type Editor_UpdateStory_MutationVariables = {|
  id: string,
  input: StoryInput,
|};
export type Editor_UpdateStory_MutationResponse = {|
  +story: ?{|
    +id: string,
    +md5: ?string,
  |}
|};
export type Editor_UpdateStory_Mutation = {|
  variables: Editor_UpdateStory_MutationVariables,
  response: Editor_UpdateStory_MutationResponse,
|};
*/


/*
mutation Editor_UpdateStory_Mutation(
  $id: ID!
  $input: StoryInput!
) {
  story: updateStory(id: $id, input: $input) {
    id
    md5
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
    "type": "StoryInput!",
    "defaultValue": null
  }
],
v1 = [
  {
    "kind": "LinkedField",
    "alias": "story",
    "name": "updateStory",
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
    "concreteType": "Story",
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
        "name": "md5",
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
    "name": "Editor_UpdateStory_Mutation",
    "type": "Mutation",
    "metadata": null,
    "argumentDefinitions": (v0/*: any*/),
    "selections": (v1/*: any*/)
  },
  "operation": {
    "kind": "Operation",
    "name": "Editor_UpdateStory_Mutation",
    "argumentDefinitions": (v0/*: any*/),
    "selections": (v1/*: any*/)
  },
  "params": {
    "operationKind": "mutation",
    "name": "Editor_UpdateStory_Mutation",
    "id": null,
    "text": "mutation Editor_UpdateStory_Mutation(\n  $id: ID!\n  $input: StoryInput!\n) {\n  story: updateStory(id: $id, input: $input) {\n    id\n    md5\n  }\n}\n",
    "metadata": {}
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = 'a5d3bf2e59b9bd6254645a461df605aa';
module.exports = node;
