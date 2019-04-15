/**
 * @flow
 * @relayHash f1672c5a1203659fc6c19587d278fcca
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
type StoryClient_story$ref = any;
export type RoutersStoryClientQueryVariables = {|
  id: string,
  local?: ?boolean,
|};
export type RoutersStoryClientQueryResponse = {|
  +story: ?{|
    +$fragmentRefs: StoryClient_story$ref
  |}
|};
export type RoutersStoryClientQuery = {|
  variables: RoutersStoryClientQueryVariables,
  response: RoutersStoryClientQueryResponse,
|};
*/


/*
query RoutersStoryClientQuery(
  $id: ID!
  $local: Boolean
) {
  story: storyInfo(id: $id, local: $local) {
    ...StoryClient_story
    id
  }
}

fragment StoryClient_story on Story {
  id
  content
  wordCount
  key
  publishTime
  tags
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
    "name": "local",
    "type": "Boolean",
    "defaultValue": null
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "id",
    "variableName": "id"
  },
  {
    "kind": "Variable",
    "name": "local",
    "variableName": "local"
  }
];
return {
  "kind": "Request",
  "fragment": {
    "kind": "Fragment",
    "name": "RoutersStoryClientQuery",
    "type": "Query",
    "metadata": null,
    "argumentDefinitions": (v0/*: any*/),
    "selections": [
      {
        "kind": "LinkedField",
        "alias": "story",
        "name": "storyInfo",
        "storageKey": null,
        "args": (v1/*: any*/),
        "concreteType": "Story",
        "plural": false,
        "selections": [
          {
            "kind": "FragmentSpread",
            "name": "StoryClient_story",
            "args": null
          }
        ]
      }
    ]
  },
  "operation": {
    "kind": "Operation",
    "name": "RoutersStoryClientQuery",
    "argumentDefinitions": (v0/*: any*/),
    "selections": [
      {
        "kind": "LinkedField",
        "alias": "story",
        "name": "storyInfo",
        "storageKey": null,
        "args": (v1/*: any*/),
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
            "name": "content",
            "args": null,
            "storageKey": null
          },
          {
            "kind": "ScalarField",
            "alias": null,
            "name": "wordCount",
            "args": null,
            "storageKey": null
          },
          {
            "kind": "ScalarField",
            "alias": null,
            "name": "key",
            "args": null,
            "storageKey": null
          },
          {
            "kind": "ScalarField",
            "alias": null,
            "name": "publishTime",
            "args": null,
            "storageKey": null
          },
          {
            "kind": "ScalarField",
            "alias": null,
            "name": "tags",
            "args": null,
            "storageKey": null
          }
        ]
      }
    ]
  },
  "params": {
    "operationKind": "query",
    "name": "RoutersStoryClientQuery",
    "id": null,
    "text": "query RoutersStoryClientQuery(\n  $id: ID!\n  $local: Boolean\n) {\n  story: storyInfo(id: $id, local: $local) {\n    ...StoryClient_story\n    id\n  }\n}\n\nfragment StoryClient_story on Story {\n  id\n  content\n  wordCount\n  key\n  publishTime\n  tags\n}\n",
    "metadata": {}
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = 'fc5332fa026f927cdc7447a9f3ece55c';
module.exports = node;
