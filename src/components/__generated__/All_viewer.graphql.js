/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type { ReaderFragment } from 'relay-runtime';
type Story_storyPart$ref = any;
import type { FragmentReference } from "relay-runtime";
declare export opaque type All_viewer$ref: FragmentReference;
declare export opaque type All_viewer$fragmentType: All_viewer$ref;
export type All_viewer = {|
  +stories: ?{|
    +edges: ?$ReadOnlyArray<?{|
      +node: ?{|
        +id: string,
        +$fragmentRefs: Story_storyPart$ref,
      |}
    |}>,
    +pageInfo: ?{|
      +endCursor: ?string,
      +hasNextPage: ?boolean,
    |},
  |},
  +$refType: All_viewer$ref,
|};
export type All_viewer$data = All_viewer;
export type All_viewer$key = {
  +$data?: All_viewer$data,
  +$fragmentRefs: All_viewer$ref,
};
*/


const node/*: ReaderFragment*/ = {
  "kind": "Fragment",
  "name": "All_viewer",
  "type": "AllViewer",
  "metadata": {
    "connection": [
      {
        "count": "first",
        "cursor": "after",
        "direction": "forward",
        "path": [
          "stories"
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
    }
  ],
  "selections": [
    {
      "kind": "LinkedField",
      "alias": "stories",
      "name": "__All_stories_connection",
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
                  "name": "__typename",
                  "args": null,
                  "storageKey": null
                },
                {
                  "kind": "FragmentSpread",
                  "name": "Story_storyPart",
                  "args": null
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
(node/*: any*/).hash = 'c99356cc24263857ce04ee383d2d4dd8';
module.exports = node;
