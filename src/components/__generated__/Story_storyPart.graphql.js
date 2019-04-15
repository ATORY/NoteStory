/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type { ReaderFragment } from 'relay-runtime';
import type { FragmentReference } from "relay-runtime";
declare export opaque type Story_storyPart$ref: FragmentReference;
declare export opaque type Story_storyPart$fragmentType: Story_storyPart$ref;
export type Story_storyPart = {|
  +id: string,
  +title: string,
  +intro: ?string,
  +tags: ?$ReadOnlyArray<?string>,
  +publishTime: ?any,
  +publisher: ?{|
    +avator: ?string,
    +nickname: ?string,
  |},
  +$refType: Story_storyPart$ref,
|};
export type Story_storyPart$data = Story_storyPart;
export type Story_storyPart$key = {
  +$data?: Story_storyPart$data,
  +$fragmentRefs: Story_storyPart$ref,
};
*/


const node/*: ReaderFragment*/ = {
  "kind": "Fragment",
  "name": "Story_storyPart",
  "type": "Story",
  "metadata": null,
  "argumentDefinitions": [],
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
        }
      ]
    }
  ]
};
// prettier-ignore
(node/*: any*/).hash = '33cbee59a19d69503033a1145898741e';
module.exports = node;
