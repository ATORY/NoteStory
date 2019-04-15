/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type { ReaderFragment } from 'relay-runtime';
import type { FragmentReference } from "relay-runtime";
declare export opaque type user_userInfo$ref: FragmentReference;
declare export opaque type user_userInfo$fragmentType: user_userInfo$ref;
export type user_userInfo = {|
  +id: string,
  +avator: ?string,
  +banner: ?string,
  +intro: ?string,
  +nickname: ?string,
  +$refType: user_userInfo$ref,
|};
export type user_userInfo$data = user_userInfo;
export type user_userInfo$key = {
  +$data?: user_userInfo$data,
  +$fragmentRefs: user_userInfo$ref,
};
*/


const node/*: ReaderFragment*/ = {
  "kind": "Fragment",
  "name": "user_userInfo",
  "type": "User",
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
      "name": "avator",
      "args": null,
      "storageKey": null
    },
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "banner",
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
      "name": "nickname",
      "args": null,
      "storageKey": null
    }
  ]
};
// prettier-ignore
(node/*: any*/).hash = '47e759546ba5b924ba5855378d51dd9c';
module.exports = node;
