/**
 * @flow
 * @relayHash 210a22a6df69fdde26b3420b799021c4
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
type Home_viewer$ref = any;
export type HomeQueryVariables = {|
  first?: ?number,
  after?: ?string,
|};
export type HomeQueryResponse = {|
  +viewer: ?{|
    +$fragmentRefs: Home_viewer$ref
  |}
|};
export type HomeQuery = {|
  variables: HomeQueryVariables,
  response: HomeQueryResponse,
|};
*/


/*
query HomeQuery(
  $first: Int
  $after: String
) {
  viewer: homeViewer {
    ...Home_viewer_2HEEH6
  }
}

fragment Home_viewer_2HEEH6 on HomeViewer {
  stories(after: $after, first: $first) {
    edges {
      node {
        id
        ...Story_storyPart
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

fragment Story_storyPart on Story {
  id
  title
  intro
  tags
  publishTime
  publisher {
    avator
    nickname
    id
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
],
v2 = {
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
    "name": "HomeQuery",
    "type": "Query",
    "metadata": null,
    "argumentDefinitions": (v0/*: any*/),
    "selections": [
      {
        "kind": "LinkedField",
        "alias": "viewer",
        "name": "homeViewer",
        "storageKey": null,
        "args": null,
        "concreteType": "HomeViewer",
        "plural": false,
        "selections": [
          {
            "kind": "FragmentSpread",
            "name": "Home_viewer",
            "args": (v1/*: any*/)
          }
        ]
      }
    ]
  },
  "operation": {
    "kind": "Operation",
    "name": "HomeQuery",
    "argumentDefinitions": (v0/*: any*/),
    "selections": [
      {
        "kind": "LinkedField",
        "alias": "viewer",
        "name": "homeViewer",
        "storageKey": null,
        "args": null,
        "concreteType": "HomeViewer",
        "plural": false,
        "selections": [
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "stories",
            "storageKey": null,
            "args": (v1/*: any*/),
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
                        "name": "tags",
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
                        "kind": "LinkedField",
                        "alias": null,
                        "name": "publisher",
                        "storageKey": null,
                        "args": null,
                        "concreteType": "User",
                        "plural": false,
                        "selections": [
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
                            "name": "nickname",
                            "args": null,
                            "storageKey": null
                          },
                          (v2/*: any*/)
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
            "name": "stories",
            "args": (v1/*: any*/),
            "handle": "connection",
            "key": "Home_stories",
            "filters": null
          }
        ]
      }
    ]
  },
  "params": {
    "operationKind": "query",
    "name": "HomeQuery",
    "id": null,
    "text": "query HomeQuery(\n  $first: Int\n  $after: String\n) {\n  viewer: homeViewer {\n    ...Home_viewer_2HEEH6\n  }\n}\n\nfragment Home_viewer_2HEEH6 on HomeViewer {\n  stories(after: $after, first: $first) {\n    edges {\n      node {\n        id\n        ...Story_storyPart\n        __typename\n      }\n      cursor\n    }\n    pageInfo {\n      endCursor\n      hasNextPage\n    }\n  }\n}\n\nfragment Story_storyPart on Story {\n  id\n  title\n  intro\n  tags\n  publishTime\n  publisher {\n    avator\n    nickname\n    id\n  }\n}\n",
    "metadata": {}
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = '87afc3db234f590768ad1cf625deef11';
module.exports = node;
