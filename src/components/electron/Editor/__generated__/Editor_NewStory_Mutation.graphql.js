/**
 * @flow
 * @relayHash 31e9e149f1d0a6833e70796ee0cc560a
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
export type Editor_NewStory_MutationVariables = {|
  input: StoryInput
|};
export type Editor_NewStory_MutationResponse = {|
  +story: ?{|
    +id: string,
    +md5: ?string,
  |}
|};
export type Editor_NewStory_Mutation = {|
  variables: Editor_NewStory_MutationVariables,
  response: Editor_NewStory_MutationResponse,
|};
*/


/*
mutation Editor_NewStory_Mutation(
  $input: StoryInput!
) {
  story: createStory(input: $input) {
    id
    md5
  }
}
*/

const node/*: ConcreteRequest*/ = (function(){
var v0 = [
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
    "name": "createStory",
    "storageKey": null,
    "args": [
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
    "name": "Editor_NewStory_Mutation",
    "type": "Mutation",
    "metadata": null,
    "argumentDefinitions": (v0/*: any*/),
    "selections": (v1/*: any*/)
  },
  "operation": {
    "kind": "Operation",
    "name": "Editor_NewStory_Mutation",
    "argumentDefinitions": (v0/*: any*/),
    "selections": (v1/*: any*/)
  },
  "params": {
    "operationKind": "mutation",
    "name": "Editor_NewStory_Mutation",
    "id": null,
    "text": "mutation Editor_NewStory_Mutation(\n  $input: StoryInput!\n) {\n  story: createStory(input: $input) {\n    id\n    md5\n  }\n}\n",
    "metadata": {}
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = 'c59e05ec043d8bdc5bc95bd8e52df5c0';
module.exports = node;
