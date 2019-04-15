/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type { ReaderFragment } from 'relay-runtime';
import type { FragmentReference } from "relay-runtime";
declare export opaque type TopicInfo_item$ref: FragmentReference;
declare export opaque type TopicInfo_item$fragmentType: TopicInfo_item$ref;
export type TopicInfo_item = {|
  +id: string,
  +title: string,
  +snapImg: string,
  +intro: string,
  +stories: ?$ReadOnlyArray<?{|
    +id: string,
    +title: string,
    +intro: ?string,
  |}>,
  +$refType: TopicInfo_item$ref,
|};
export type TopicInfo_item$data = TopicInfo_item;
export type TopicInfo_item$key = {
  +$data?: TopicInfo_item$data,
  +$fragmentRefs: TopicInfo_item$ref,
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
  "name": "title",
  "args": null,
  "storageKey": null
},
v2 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "intro",
  "args": null,
  "storageKey": null
};
return {
  "kind": "Fragment",
  "name": "TopicInfo_item",
  "type": "Topic",
  "metadata": null,
  "argumentDefinitions": [],
  "selections": [
    (v0/*: any*/),
    (v1/*: any*/),
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "snapImg",
      "args": null,
      "storageKey": null
    },
    (v2/*: any*/),
    {
      "kind": "LinkedField",
      "alias": null,
      "name": "stories",
      "storageKey": null,
      "args": null,
      "concreteType": "Story",
      "plural": true,
      "selections": [
        (v0/*: any*/),
        (v1/*: any*/),
        (v2/*: any*/)
      ]
    }
  ]
};
})();
// prettier-ignore
(node/*: any*/).hash = '44c039287508c8d9df202a6181322e30';
module.exports = node;
