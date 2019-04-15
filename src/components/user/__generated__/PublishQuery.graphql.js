/**
 * @flow
 * @relayHash 33ef78dc047ced5c3c7392216fbdb8fe
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
type Publish_info$ref = any;
export type PublishQueryVariables = {|
  token: string,
  first?: ?number,
  after?: ?string,
|};
export type PublishQueryResponse = {|
  +info: ?{|
    +$fragmentRefs: Publish_info$ref
  |}
|};
export type PublishQuery = {|
  variables: PublishQueryVariables,
  response: PublishQueryResponse,
|};
*/


/*
query PublishQuery(
  $token: String!
  $first: Int
  $after: String
) {
  info: userInfo(token: $token) {
    ...Publish_info_cMtZM
    id
  }
}

fragment Publish_info_cMtZM on User {
  publishedStories(after: $after, first: $first) {
    edges {
      node {
        id
        title
        intro
        recommend
        valid
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
};
return {
  "kind": "Request",
  "fragment": {
    "kind": "Fragment",
    "name": "PublishQuery",
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
            "name": "Publish_info",
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
    "name": "PublishQuery",
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
            "name": "publishedStories",
            "storageKey": null,
            "args": (v5/*: any*/),
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
                      (v6/*: any*/),
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
          },
          {
            "kind": "LinkedHandle",
            "alias": null,
            "name": "publishedStories",
            "args": (v5/*: any*/),
            "handle": "connection",
            "key": "user_publishedStories",
            "filters": null
          },
          (v6/*: any*/)
        ]
      }
    ]
  },
  "params": {
    "operationKind": "query",
    "name": "PublishQuery",
    "id": null,
    "text": "query PublishQuery(\n  $token: String!\n  $first: Int\n  $after: String\n) {\n  info: userInfo(token: $token) {\n    ...Publish_info_cMtZM\n    id\n  }\n}\n\nfragment Publish_info_cMtZM on User {\n  publishedStories(after: $after, first: $first) {\n    edges {\n      node {\n        id\n        title\n        intro\n        recommend\n        valid\n        publishTime\n        __typename\n      }\n      cursor\n    }\n    pageInfo {\n      endCursor\n      hasNextPage\n    }\n  }\n}\n",
    "metadata": {}
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = '556623d5bf76415339b14a97d53b596d';
module.exports = node;
