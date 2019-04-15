/**
 * @flow
 * @relayHash 91135eca6a6b8dc9750fcca903734a27
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type TopicsPublishQueryVariables = {|
  token: string,
  first?: ?number,
  after?: ?string,
|};
export type TopicsPublishQueryResponse = {|
  +info: ?{|
    +publishedStories: ?{|
      +edges: ?$ReadOnlyArray<?{|
        +node: ?{|
          +id: string,
          +title: string,
          +intro: ?string,
        |}
      |}>,
      +pageInfo: ?{|
        +endCursor: ?string,
        +hasNextPage: ?boolean,
      |},
    |}
  |}
|};
export type TopicsPublishQuery = {|
  variables: TopicsPublishQueryVariables,
  response: TopicsPublishQueryResponse,
|};
*/


/*
query TopicsPublishQuery(
  $token: String!
  $first: Int
  $after: String
) {
  info: userInfo(token: $token) {
    publishedStories(after: $after, first: $first) {
      edges {
        node {
          id
          title
          intro
          __typename
        }
        cursor
      }
      pageInfo {
        endCursor
        hasNextPage
      }
    }
    id
  }
}
*/

const node/*: ConcreteRequest*/ = (function(){
var v0 = [
  {
    "kind": "LocalArgument",
    "name": "token",
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
    "name": "token",
    "variableName": "token"
  }
],
v2 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "id",
  "args": null,
  "storageKey": null
},
v3 = [
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
],
v4 = [
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
];
return {
  "kind": "Request",
  "fragment": {
    "kind": "Fragment",
    "name": "TopicsPublishQuery",
    "type": "Query",
    "metadata": null,
    "argumentDefinitions": (v0/*: any*/),
    "selections": [
      {
        "kind": "LinkedField",
        "alias": "info",
        "name": "userInfo",
        "storageKey": null,
        "args": (v1/*: any*/),
        "concreteType": "User",
        "plural": false,
        "selections": [
          {
            "kind": "LinkedField",
            "alias": "publishedStories",
            "name": "__user_publishedStories_connection",
            "storageKey": null,
            "args": null,
            "concreteType": "StoryPagination",
            "plural": false,
            "selections": (v3/*: any*/)
          }
        ]
      }
    ]
  },
  "operation": {
    "kind": "Operation",
    "name": "TopicsPublishQuery",
    "argumentDefinitions": (v0/*: any*/),
    "selections": [
      {
        "kind": "LinkedField",
        "alias": "info",
        "name": "userInfo",
        "storageKey": null,
        "args": (v1/*: any*/),
        "concreteType": "User",
        "plural": false,
        "selections": [
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "publishedStories",
            "storageKey": null,
            "args": (v4/*: any*/),
            "concreteType": "StoryPagination",
            "plural": false,
            "selections": (v3/*: any*/)
          },
          {
            "kind": "LinkedHandle",
            "alias": null,
            "name": "publishedStories",
            "args": (v4/*: any*/),
            "handle": "connection",
            "key": "user_publishedStories",
            "filters": null
          },
          (v2/*: any*/)
        ]
      }
    ]
  },
  "params": {
    "operationKind": "query",
    "name": "TopicsPublishQuery",
    "id": null,
    "text": "query TopicsPublishQuery(\n  $token: String!\n  $first: Int\n  $after: String\n) {\n  info: userInfo(token: $token) {\n    publishedStories(after: $after, first: $first) {\n      edges {\n        node {\n          id\n          title\n          intro\n          __typename\n        }\n        cursor\n      }\n      pageInfo {\n        endCursor\n        hasNextPage\n      }\n    }\n    id\n  }\n}\n",
    "metadata": {
      "connection": [
        {
          "count": "first",
          "cursor": "after",
          "direction": "forward",
          "path": [
            "info",
            "publishedStories"
          ]
        }
      ]
    }
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = 'ebae4abcbc0017069d816ffd12d5efe0';
module.exports = node;
