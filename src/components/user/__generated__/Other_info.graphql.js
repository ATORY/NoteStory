/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type { ReaderFragment } from 'relay-runtime';
import type { FragmentReference } from "relay-runtime";
declare export opaque type Other_info$ref: FragmentReference;
declare export opaque type Other_info$fragmentType: Other_info$ref;
export type Other_info = {|
  +id: string,
  +nickname: ?string,
  +banner: ?string,
  +intro: ?string,
  +avator: ?string,
  +hasFollow: ?boolean,
  +stories: ?{|
    +edges: ?$ReadOnlyArray<?{|
      +node: ?{|
        +id: string,
        +title: string,
        +intro: ?string,
        +publishTime: ?any,
      |}
    |}>,
    +pageInfo: ?{|
      +endCursor: ?string,
      +hasNextPage: ?boolean,
    |},
  |},
  +$refType: Other_info$ref,
|};
export type Other_info$data = Other_info;
export type Other_info$key = {
  +$data?: Other_info$data,
  +$fragmentRefs: Other_info$ref,
};
*/


const node/*: ReaderFragment*/ = (function(){
var v0 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "id",
  "args": null,
  "storageKey": null
},
v1 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "intro",
  "args": null,
  "storageKey": null
};
return {
  "kind": "Fragment",
  "name": "Other_info",
  "type": "User",
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
    },
    {
      "kind": "LocalArgument",
      "name": "openId",
      "type": "String",
      "defaultValue": ""
    }
  ],
  "selections": [
    (v0/*: any*/),
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
      "name": "banner",
      "args": null,
      "storageKey": null
    },
    (v1/*: any*/),
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
    },
    {
      "kind": "LinkedField",
      "alias": "stories",
      "name": "__other_stories_connection",
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
                (v0/*: any*/),
                {
                  "kind": "ScalarField",
                  "alias": null,
                  "name": "title",
                  "args": null,
                  "storageKey": null
                },
                (v1/*: any*/),
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
})();
// prettier-ignore
(node/*: any*/).hash = 'f5ae9af9f23aaee23fbac7bcdf8cee50';
module.exports = node;
