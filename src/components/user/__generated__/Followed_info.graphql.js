/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type { ReaderFragment } from 'relay-runtime';
import type { FragmentReference } from "relay-runtime";
declare export opaque type Followed_info$ref: FragmentReference;
declare export opaque type Followed_info$fragmentType: Followed_info$ref;
export type Followed_info = {|
  +id: string,
  +followeds: ?{|
    +edges: ?$ReadOnlyArray<?{|
      +node: ?{|
        +id: string,
        +nickname: ?string,
        +intro: ?string,
        +avator: ?string,
        +hasFollow: ?boolean,
      |}
    |}>,
    +pageInfo: ?{|
      +endCursor: ?string,
      +hasNextPage: ?boolean,
    |},
  |},
  +$refType: Followed_info$ref,
|};
export type Followed_info$data = Followed_info;
export type Followed_info$key = {
  +$data?: Followed_info$data,
  +$fragmentRefs: Followed_info$ref,
};
*/


const node/*: ReaderFragment*/ = (function(){
var v0 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "id",
  "args": null,
  "storageKey": null
};
return {
  "kind": "Fragment",
  "name": "Followed_info",
  "type": "User",
  "metadata": {
    "connection": [
      {
        "count": "first",
        "cursor": "after",
        "direction": "forward",
        "path": [
          "followeds"
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
    (v0/*: any*/),
    {
      "kind": "LinkedField",
      "alias": "followeds",
      "name": "__user_followeds_connection",
      "storageKey": null,
      "args": null,
      "concreteType": "FollowedPagination",
      "plural": false,
      "selections": [
        {
          "kind": "LinkedField",
          "alias": null,
          "name": "edges",
          "storageKey": null,
          "args": null,
          "concreteType": "FollowedEdge",
          "plural": true,
          "selections": [
            {
              "kind": "LinkedField",
              "alias": null,
              "name": "node",
              "storageKey": null,
              "args": null,
              "concreteType": "User",
              "plural": false,
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
                  "name": "intro",
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
(node/*: any*/).hash = '557e8fd245250394ea29b624a2be407b';
module.exports = node;
