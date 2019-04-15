/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type { ReaderFragment } from 'relay-runtime';
import type { FragmentReference } from "relay-runtime";
declare export opaque type Story_story$ref: FragmentReference;
declare export opaque type Story_story$fragmentType: Story_story$ref;
export type Story_story = {|
  +id: string,
  +title: string,
  +intro: ?string,
  +content: ?string,
  +wordCount: ?number,
  +key: ?string,
  +publishTime: ?any,
  +tags: ?$ReadOnlyArray<?string>,
  +publisher: ?{|
    +id: string,
    +nickname: ?string,
    +avator: ?string,
    +hasFollow: ?boolean,
  |},
  +$refType: Story_story$ref,
|};
export type Story_story$data = Story_story;
export type Story_story$key = {
  +$data?: Story_story$data,
  +$fragmentRefs: Story_story$ref,
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
  "name": "Story_story",
  "type": "Story",
  "metadata": null,
  "argumentDefinitions": [],
  "selections": [
    (v0/*: any*/),
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
      "name": "content",
      "args": null,
      "storageKey": null
    },
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "wordCount",
      "args": null,
      "storageKey": null
    },
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "key",
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
      "name": "tags",
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
        }
      ]
    }
  ]
};
})();
// prettier-ignore
(node/*: any*/).hash = 'bf43e10941273aa101740734125a28cc';
module.exports = node;
