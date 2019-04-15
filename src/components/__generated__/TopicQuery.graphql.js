/**
 * @flow
 * @relayHash 13023adc4e228d2accb783626d453437
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
type Topic_viewer$ref = any;
export type TopicQueryVariables = {|
  first?: ?number,
  after?: ?string,
|};
export type TopicQueryResponse = {|
  +viewer: ?{|
    +$fragmentRefs: Topic_viewer$ref
  |}
|};
export type TopicQuery = {|
  variables: TopicQueryVariables,
  response: TopicQueryResponse,
|};
*/


/*
query TopicQuery(
  $first: Int
  $after: String
) {
  viewer: topicViewer {
    ...Topic_viewer_2HEEH6
  }
}

fragment Topic_viewer_2HEEH6 on TopicViewer {
  topics(after: $after, first: $first) {
    edges {
      node {
        id
        title
        snapImg
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
}
*/

const node/*: ConcreteRequest*/ = (function(){
var v0 = [
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
    "name": "TopicQuery",
    "type": "Query",
    "metadata": null,
    "argumentDefinitions": (v0/*: any*/),
    "selections": [
      {
        "kind": "LinkedField",
        "alias": "viewer",
        "name": "topicViewer",
        "storageKey": null,
        "args": null,
        "concreteType": "TopicViewer",
        "plural": false,
        "selections": [
          {
            "kind": "FragmentSpread",
            "name": "Topic_viewer",
            "args": (v1/*: any*/)
          }
        ]
      }
    ]
  },
  "operation": {
    "kind": "Operation",
    "name": "TopicQuery",
    "argumentDefinitions": (v0/*: any*/),
    "selections": [
      {
        "kind": "LinkedField",
        "alias": "viewer",
        "name": "topicViewer",
        "storageKey": null,
        "args": null,
        "concreteType": "TopicViewer",
        "plural": false,
        "selections": [
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "topics",
            "storageKey": null,
            "args": (v1/*: any*/),
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
                        "name": "snapImg",
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
            ]
          },
          {
            "kind": "LinkedHandle",
            "alias": null,
            "name": "topics",
            "args": (v1/*: any*/),
            "handle": "connection",
            "key": "All_topics",
            "filters": null
          }
        ]
      }
    ]
  },
  "params": {
    "operationKind": "query",
    "name": "TopicQuery",
    "id": null,
    "text": "query TopicQuery(\n  $first: Int\n  $after: String\n) {\n  viewer: topicViewer {\n    ...Topic_viewer_2HEEH6\n  }\n}\n\nfragment Topic_viewer_2HEEH6 on TopicViewer {\n  topics(after: $after, first: $first) {\n    edges {\n      node {\n        id\n        title\n        snapImg\n        intro\n        __typename\n      }\n      cursor\n    }\n    pageInfo {\n      endCursor\n      hasNextPage\n    }\n  }\n}\n",
    "metadata": {}
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = '3e773ee27c613109296351c42bf58cb5';
module.exports = node;
