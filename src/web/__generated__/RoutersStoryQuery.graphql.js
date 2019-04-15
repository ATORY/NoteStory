/**
 * @flow
 * @relayHash 6c0e63b28017b1fdee3519c8bdd23518
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
type Story_story$ref = any;
export type RoutersStoryQueryVariables = {|
  id: string,
  local?: ?boolean,
|};
export type RoutersStoryQueryResponse = {|
  +story: ?{|
    +$fragmentRefs: Story_story$ref
  |}
|};
export type RoutersStoryQuery = {|
  variables: RoutersStoryQueryVariables,
  response: RoutersStoryQueryResponse,
|};
*/


/*
query RoutersStoryQuery(
  $id: ID!
  $local: Boolean
) {
  story: storyInfo(id: $id, local: $local) {
    ...Story_story
    id
  }
}

fragment Story_story on Story {
  id
  title
  intro
  content
  wordCount
  key
  publishTime
  tags
  publisher {
    id
    nickname
    avator
    hasFollow
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
],
v2 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "id",
  "args": null,
  "storageKey": null
};
return {
  "kind": "Request",
  "fragment": {
    "kind": "Fragment",
    "name": "RoutersStoryQuery",
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
            "name": "Story_story",
            "args": null
          }
        ]
      }
    ]
  },
  "operation": {
    "kind": "Operation",
    "name": "RoutersStoryQuery",
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
          (v2/*: any*/),
          {
            "kind": "ScalarField",
            "alias": null,
            "name": "title",
            "args": null,
            "storageKey": null
          },
          {
            "kind": "ScalarField",
            "alias": null,
            "name": "intro",
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
          },
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "publisher",
            "storageKey": null,
            "args": null,
            "concreteType": "User",
            "plural": false,
            "selections": [
              (v2/*: any*/),
              {
                "kind": "ScalarField",
                "alias": null,
                "name": "nickname",
                "args": null,
                "storageKey": null
              },
              {
                "kind": "ScalarField",
                "alias": null,
                "name": "avator",
                "args": null,
                "storageKey": null
              },
              {
                "kind": "ScalarField",
                "alias": null,
                "name": "hasFollow",
                "args": null,
                "storageKey": null
              }
            ]
          }
        ]
      }
    ]
  },
  "params": {
    "operationKind": "query",
    "name": "RoutersStoryQuery",
    "id": null,
    "text": "query RoutersStoryQuery(\n  $id: ID!\n  $local: Boolean\n) {\n  story: storyInfo(id: $id, local: $local) {\n    ...Story_story\n    id\n  }\n}\n\nfragment Story_story on Story {\n  id\n  title\n  intro\n  content\n  wordCount\n  key\n  publishTime\n  tags\n  publisher {\n    id\n    nickname\n    avator\n    hasFollow\n  }\n}\n",
    "metadata": {}
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = 'dec31e05f2fbbe38805b7573f88c6759';
module.exports = node;
