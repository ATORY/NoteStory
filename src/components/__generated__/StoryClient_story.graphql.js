/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type { ReaderFragment } from 'relay-runtime';
import type { FragmentReference } from "relay-runtime";
declare export opaque type StoryClient_story$ref: FragmentReference;
declare export opaque type StoryClient_story$fragmentType: StoryClient_story$ref;
export type StoryClient_story = {|
  +id: string,
  +content: ?string,
  +wordCount: ?number,
  +key: ?string,
  +publishTime: ?any,
  +tags: ?$ReadOnlyArray<?string>,
  +$refType: StoryClient_story$ref,
|};
export type StoryClient_story$data = StoryClient_story;
export type StoryClient_story$key = {
  +$data?: StoryClient_story$data,
  +$fragmentRefs: StoryClient_story$ref,
};
*/


const node/*: ReaderFragment*/ = {
  "kind": "Fragment",
  "name": "StoryClient_story",
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
    }
  ]
};
// prettier-ignore
(node/*: any*/).hash = 'ec0ecd8fb9a4ffb698029cf6e815837d';
module.exports = node;
