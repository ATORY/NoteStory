/**
 * @flow
 * @relayHash db42e9a9c20f486f95e08e12fa0729a1
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
type Followed_info$ref = any;
export type FollowedQueryVariables = {|
  token: string,
  first?: ?number,
  after?: ?string,
|};
export type FollowedQueryResponse = {|
  +info: ?{|
    +$fragmentRefs: Followed_info$ref
  |}
|};
export type FollowedQuery = {|
  variables: FollowedQueryVariables,
  response: FollowedQueryResponse,
|};
*/


/*
query FollowedQuery(
  $token: String!
  $first: Int
  $after: String
) {
  info: userInfo(token: $token) {
    ...Followed_info_cMtZM
    id
  }
}

fragment Followed_info_cMtZM on User {
  id
  followeds(after: $after, first: $first) {
    edges {
      node {
        id
        nickname
        intro
        avator
        hasFollow
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
v5 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "id",
  "args": null,
  "storageKey": null
},
v6 = [
  (v3/*: any*/),
  (v4/*: any*/)
];
return {
  "kind": "Request",
  "fragment": {
    "kind": "Fragment",
    "name": "FollowedQuery",
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
            "name": "Followed_info",
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
    "name": "FollowedQuery",
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
          (v5/*: any*/),
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "followeds",
            "storageKey": null,
            "args": (v6/*: any*/),
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
                      (v5/*: any*/),
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
          },
          {
            "kind": "LinkedHandle",
            "alias": null,
            "name": "followeds",
            "args": (v6/*: any*/),
            "handle": "connection",
            "key": "user_followeds",
            "filters": null
          }
        ]
      }
    ]
  },
  "params": {
    "operationKind": "query",
    "name": "FollowedQuery",
    "id": null,
    "text": "query FollowedQuery(\n  $token: String!\n  $first: Int\n  $after: String\n) {\n  info: userInfo(token: $token) {\n    ...Followed_info_cMtZM\n    id\n  }\n}\n\nfragment Followed_info_cMtZM on User {\n  id\n  followeds(after: $after, first: $first) {\n    edges {\n      node {\n        id\n        nickname\n        intro\n        avator\n        hasFollow\n        __typename\n      }\n      cursor\n    }\n    pageInfo {\n      endCursor\n      hasNextPage\n    }\n  }\n}\n",
    "metadata": {}
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = '4e07a50ada8d315600d2f994b23a70c3';
module.exports = node;
