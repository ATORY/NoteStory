/**
 * @flow
 * @relayHash a261d10730ef245b2e7b7874f5145c31
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
type Other_info$ref = any;
export type OtherQueryVariables = {|
  openId: string,
  first?: ?number,
  after?: ?string,
|};
export type OtherQueryResponse = {|
  +info: ?{|
    +$fragmentRefs: Other_info$ref
  |}
|};
export type OtherQuery = {|
  variables: OtherQueryVariables,
  response: OtherQueryResponse,
|};
*/


/*
query OtherQuery(
  $openId: String!
  $first: Int
  $after: String
) {
  info: userProfile(openId: $openId) {
    ...Other_info_2HEEH6
    id
  }
}

fragment Other_info_2HEEH6 on User {
  id
  nickname
  banner
  intro
  avator
  hasFollow
  stories: publishedStories(after: $after, first: $first) {
    edges {
      node {
        id
        title
        intro
        publishTime
        __typename
      }
      cursor
    }
    pageInfo {
      endCursor
      hasNextPage
    }
  }
}
*/

const node/*: ConcreteRequest*/ = (function(){
var v0 = [
  {
    "kind": "LocalArgument",
    "name": "openId",
    "type": "String!",
    "defaultValue": null
  },
  {
    "kind": "LocalArgument",
    "name": "first",
    "type": "Int",
    "defaultValue": null
  },
  {
    "kind": "LocalArgument",
    "name": "after",
    "type": "String",
    "defaultValue": null
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "openId",
    "variableName": "openId"
  }
],
v2 = [
  {
    "kind": "Variable",
    "name": "after",
    "variableName": "after"
  },
  {
    "kind": "Variable",
    "name": "first",
    "variableName": "first"
  }
],
v3 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "id",
  "args": null,
  "storageKey": null
},
v4 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "intro",
  "args": null,
  "storageKey": null
};
return {
  "kind": "Request",
  "fragment": {
    "kind": "Fragment",
    "name": "OtherQuery",
    "type": "Query",
    "metadata": null,
    "argumentDefinitions": (v0/*: any*/),
    "selections": [
      {
        "kind": "LinkedField",
        "alias": "info",
        "name": "userProfile",
        "storageKey": null,
        "args": (v1/*: any*/),
        "concreteType": "User",
        "plural": false,
        "selections": [
          {
            "kind": "FragmentSpread",
            "name": "Other_info",
            "args": (v2/*: any*/)
          }
        ]
      }
    ]
  },
  "operation": {
    "kind": "Operation",
    "name": "OtherQuery",
    "argumentDefinitions": (v0/*: any*/),
    "selections": [
      {
        "kind": "LinkedField",
        "alias": "info",
        "name": "userProfile",
        "storageKey": null,
        "args": (v1/*: any*/),
        "concreteType": "User",
        "plural": false,
        "selections": [
          (v3/*: any*/),
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
          (v4/*: any*/),
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
            "name": "publishedStories",
            "storageKey": null,
            "args": (v2/*: any*/),
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
                      (v3/*: any*/),
                      {
                        "kind": "ScalarField",
                        "alias": null,
                        "name": "title",
                        "args": null,
                        "storageKey": null
                      },
                      (v4/*: any*/),
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
          },
          {
            "kind": "LinkedHandle",
            "alias": "stories",
            "name": "publishedStories",
            "args": (v2/*: any*/),
            "handle": "connection",
            "key": "other_stories",
            "filters": null
          }
        ]
      }
    ]
  },
  "params": {
    "operationKind": "query",
    "name": "OtherQuery",
    "id": null,
    "text": "query OtherQuery(\n  $openId: String!\n  $first: Int\n  $after: String\n) {\n  info: userProfile(openId: $openId) {\n    ...Other_info_2HEEH6\n    id\n  }\n}\n\nfragment Other_info_2HEEH6 on User {\n  id\n  nickname\n  banner\n  intro\n  avator\n  hasFollow\n  stories: publishedStories(after: $after, first: $first) {\n    edges {\n      node {\n        id\n        title\n        intro\n        publishTime\n        __typename\n      }\n      cursor\n    }\n    pageInfo {\n      endCursor\n      hasNextPage\n    }\n  }\n}\n",
    "metadata": {}
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = '28d18af652af88199f304d051ad4e9fe';
module.exports = node;
