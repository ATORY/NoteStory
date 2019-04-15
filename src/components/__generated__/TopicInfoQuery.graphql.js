/**
 * @flow
 * @relayHash 9c96e8703ffa681fe6b915e9b02be8eb
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
type TopicInfo_item$ref = any;
export type TopicInfoQueryVariables = {|
  id: string
|};
export type TopicInfoQueryResponse = {|
  +item: ?{|
    +$fragmentRefs: TopicInfo_item$ref
  |}
|};
export type TopicInfoQuery = {|
  variables: TopicInfoQueryVariables,
  response: TopicInfoQueryResponse,
|};
*/


/*
query TopicInfoQuery(
  $id: ID!
) {
  item: topicInfo(id: $id) {
    ...TopicInfo_item
    id
  }
}

fragment TopicInfo_item on Topic {
  id
  title
  snapImg
  intro
  stories {
    id
    title
    intro
  }
}
*/

const node/*: ConcreteRequest*/ = (function(){
var v0 = [
  {
    "kind": "LocalArgument",
    "name": "id",
    "type": "ID!",
    "defaultValue": null
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "id",
    "variableName": "id"
  }
],
v2 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "id",
  "args": null,
  "storageKey": null
},
v3 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "title",
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
    "name": "TopicInfoQuery",
    "type": "Query",
    "metadata": null,
    "argumentDefinitions": (v0/*: any*/),
    "selections": [
      {
        "kind": "LinkedField",
        "alias": "item",
        "name": "topicInfo",
        "storageKey": null,
        "args": (v1/*: any*/),
        "concreteType": "Topic",
        "plural": false,
        "selections": [
          {
            "kind": "FragmentSpread",
            "name": "TopicInfo_item",
            "args": null
          }
        ]
      }
    ]
  },
  "operation": {
    "kind": "Operation",
    "name": "TopicInfoQuery",
    "argumentDefinitions": (v0/*: any*/),
    "selections": [
      {
        "kind": "LinkedField",
        "alias": "item",
        "name": "topicInfo",
        "storageKey": null,
        "args": (v1/*: any*/),
        "concreteType": "Topic",
        "plural": false,
        "selections": [
          (v2/*: any*/),
          (v3/*: any*/),
          {
            "kind": "ScalarField",
            "alias": null,
            "name": "snapImg",
            "args": null,
            "storageKey": null
          },
          (v4/*: any*/),
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "stories",
            "storageKey": null,
            "args": null,
            "concreteType": "Story",
            "plural": true,
            "selections": [
              (v2/*: any*/),
              (v3/*: any*/),
              (v4/*: any*/)
            ]
          }
        ]
      }
    ]
  },
  "params": {
    "operationKind": "query",
    "name": "TopicInfoQuery",
    "id": null,
    "text": "query TopicInfoQuery(\n  $id: ID!\n) {\n  item: topicInfo(id: $id) {\n    ...TopicInfo_item\n    id\n  }\n}\n\nfragment TopicInfo_item on Topic {\n  id\n  title\n  snapImg\n  intro\n  stories {\n    id\n    title\n    intro\n  }\n}\n",
    "metadata": {}
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = 'e2fa306041c62dc66ed88b2356e444ae';
module.exports = node;
