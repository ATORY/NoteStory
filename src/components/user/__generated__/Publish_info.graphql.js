/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type { ReaderFragment } from 'relay-runtime';
import type { FragmentReference } from "relay-runtime";
declare export opaque type Publish_info$ref: FragmentReference;
declare export opaque type Publish_info$fragmentType: Publish_info$ref;
export type Publish_info = {|
  +publishedStories: ?{|
    +edges: ?$ReadOnlyArray<?{|
      +node: ?{|
        +id: string,
        +title: string,
        +intro: ?string,
        +recommend: ?boolean,
        +valid: ?boolean,
        +publishTime: ?any,
      |}
    |}>,
    +pageInfo: ?{|
      +endCursor: ?string,
      +hasNextPage: ?boolean,
    |},
  |},
  +$refType: Publish_info$ref,
|};
export type Publish_info$data = Publish_info;
export type Publish_info$key = {
  +$data?: Publish_info$data,
  +$fragmentRefs: Publish_info$ref,
};
*/


const node/*: ReaderFragment*/ = {
  "kind": "Fragment",
  "name": "Publish_info",
  "type": "User",
  "metadata": {
    "connection": [
      {
        "count": "first",
        "cursor": "after",
        "direction": "forward",
        "path": [
          "publishedStories"
        ]
      }
    ]
  },
  "argumentDefinitions": [
    {
      "kind": "LocalArgument",
      "name": "first",
      "type": "Int",
      "defaultValue": 10
    },
    {
      "kind": "LocalArgument",
      "name": "after",
      "type": "String",
      "defaultValue": ""
    },
    {
      "kind": "LocalArgument",
      "name": "token",
      "type": "String",
      "defaultValue": ""
    }
  ],
  "selections": [
    {
      "kind": "LinkedField",
      "alias": "publishedStories",
      "name": "__user_publishedStories_connection",
      "storageKey": null,
      "args": null,
      "concreteType": "StoryPagination",
      "plural": false,
      "selections": [
        {
          "kind": "LinkedField",
          "alias": null,
          "name": "edges",
          "storageKey": null,
          "args": null,
          "concreteType": "StoryEdge",
          "plural": true,
          "selections": [
            {
              "kind": "LinkedField",
              "alias": null,
              "name": "node",
              "storageKey": null,
              "args": null,
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
                  "name": "recommend",
                  "args": null,
                  "storageKey": null
                },
                {
                  "kind": "ScalarField",
                  "alias": null,
                  "name": "valid",
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
                  "name": "__typename",
                  "args": null,
                  "storageKey": null
                }
              ]
            },
            {
              "kind": "ScalarField",
              "alias": null,
              "name": "cursor",
              "args": null,
              "storageKey": null
            }
          ]
        },
        {
          "kind": "LinkedField",
          "alias": null,
          "name": "pageInfo",
          "storageKey": null,
          "args": null,
          "concreteType": "PageInfo",
          "plural": false,
          "selections": [
            {
              "kind": "ScalarField",
              "alias": null,
              "name": "endCursor",
              "args": null,
              "storageKey": null
            },
            {
              "kind": "ScalarField",
              "alias": null,
              "name": "hasNextPage",
              "args": null,
              "storageKey": null
            }
          ]
        }
      ]
    }
  ]
};
// prettier-ignore
(node/*: any*/).hash = '97f81f83b0093f095c3d35d30e74d8c0';
module.exports = node;
