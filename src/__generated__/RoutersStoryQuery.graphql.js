/**
 * @flow
 * @relayHash b7cd224398a76bd4f00287b015066799
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
type Test_story$ref = any;
export type RoutersStoryQueryVariables = {|
  id: string,
  local?: ?boolean,
|};
export type RoutersStoryQueryResponse = {|
  +story: ?{|
    +$fragmentRefs: Test_story$ref
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
    ...Test_story
    id
  }
}

fragment Test_story on Story {
  id
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
    "variableName": "id",
    "type": "ID!"
  },
  {
    "kind": "Variable",
    "name": "local",
    "variableName": "local",
    "type": "Boolean"
  }
];
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
            "name": "Test_story",
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
          {
            "kind": "ScalarField",
            "alias": null,
            "name": "id",
            "args": null,
            "storageKey": null
          }
        ]
      }
    ]
  },
  "params": {
    "operationKind": "query",
    "name": "RoutersStoryQuery",
    "id": null,
    "text": "query RoutersStoryQuery(\n  $id: ID!\n  $local: Boolean\n) {\n  story: storyInfo(id: $id, local: $local) {\n    ...Test_story\n    id\n  }\n}\n\nfragment Test_story on Story {\n  id\n}\n",
    "metadata": {}
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = 'dac93d065a0ac896b7b399cd77217a10';
module.exports = node;
