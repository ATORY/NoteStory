/**
 * @flow
 * @relayHash e6823e041c8a31442f182a671e4498e3
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
type Topics_info$ref = any;
export type TopicsQueryVariables = {|
  token: string,
  first?: ?number,
  after?: ?string,
|};
export type TopicsQueryResponse = {|
  +info: ?{|
    +$fragmentRefs: Topics_info$ref
  |}
|};
export type TopicsQuery = {|
  variables: TopicsQueryVariables,
  response: TopicsQueryResponse,
|};
*/


/*
query TopicsQuery(
  $token: String!
  $first: Int
  $after: String
) {
  info: userInfo(token: $token) {
    ...Topics_info_cMtZM
    id
  }
}

fragment Topics_info_cMtZM on User {
  topics(after: $after, first: $first) {
    edges {
      node {
        id
        title
        intro
        snapImg
        stories {
          id
          title
        }
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
v1 = {
  "kind": "Variable",
  "name": "token",
  "variableName": "token"
},
v2 = [
  (v1/*: any*/)
],
v3 = {
  "kind": "Variable",
  "name": "after",
  "variableName": "after"
},
v4 = {
  "kind": "Variable",
  "name": "first",
  "variableName": "first"
},
v5 = [
  (v3/*: any*/),
  (v4/*: any*/)
],
v6 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "id",
  "args": null,
  "storageKey": null
},
v7 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "title",
  "args": null,
  "storageKey": null
};
return {
  "kind": "Request",
  "fragment": {
    "kind": "Fragment",
    "name": "TopicsQuery",
    "type": "Query",
    "metadata": null,
    "argumentDefinitions": (v0/*: any*/),
    "selections": [
      {
        "kind": "LinkedField",
        "alias": "info",
        "name": "userInfo",
        "storageKey": null,
        "args": (v2/*: any*/),
        "concreteType": "User",
        "plural": false,
        "selections": [
          {
            "kind": "FragmentSpread",
            "name": "Topics_info",
            "args": [
              (v3/*: any*/),
              (v4/*: any*/),
              (v1/*: any*/)
            ]
          }
        ]
      }
    ]
  },
  "operation": {
    "kind": "Operation",
    "name": "TopicsQuery",
    "argumentDefinitions": (v0/*: any*/),
    "selections": [
      {
        "kind": "LinkedField",
        "alias": "info",
        "name": "userInfo",
        "storageKey": null,
        "args": (v2/*: any*/),
        "concreteType": "User",
        "plural": false,
        "selections": [
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "topics",
            "storageKey": null,
            "args": (v5/*: any*/),
            "concreteType": "TopicPagination",
            "plural": false,
            "selections": [
              {
                "kind": "LinkedField",
                "alias": null,
                "name": "edges",
                "storageKey": null,
                "args": null,
                "concreteType": "TopicEdge",
                "plural": true,
                "selections": [
                  {
                    "kind": "LinkedField",
                    "alias": null,
                    "name": "node",
                    "storageKey": null,
                    "args": null,
                    "concreteType": "Topic",
                    "plural": false,
                    "selections": [
                      (v6/*: any*/),
                      (v7/*: any*/),
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
                        "name": "snapImg",
                        "args": null,
                        "storageKey": null
                      },
                      {
                        "kind": "LinkedField",
                        "alias": null,
                        "name": "stories",
                        "storageKey": null,
                        "args": null,
                        "concreteType": "Story",
                        "plural": true,
                        "selections": [
                          (v6/*: any*/),
                          (v7/*: any*/)
                        ]
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
            "alias": null,
            "name": "topics",
            "args": (v5/*: any*/),
            "handle": "connection",
            "key": "user_topics",
            "filters": null
          },
          (v6/*: any*/)
        ]
      }
    ]
  },
  "params": {
    "operationKind": "query",
    "name": "TopicsQuery",
    "id": null,
    "text": "query TopicsQuery(\n  $token: String!\n  $first: Int\n  $after: String\n) {\n  info: userInfo(token: $token) {\n    ...Topics_info_cMtZM\n    id\n  }\n}\n\nfragment Topics_info_cMtZM on User {\n  topics(after: $after, first: $first) {\n    edges {\n      node {\n        id\n        title\n        intro\n        snapImg\n        stories {\n          id\n          title\n        }\n        __typename\n      }\n      cursor\n    }\n    pageInfo {\n      endCursor\n      hasNextPage\n    }\n  }\n}\n",
    "metadata": {}
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = '0456232c3ae69f2d1989f8ddf2843488';
module.exports = node;
