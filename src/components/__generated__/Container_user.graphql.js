/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type { ReaderFragment } from 'relay-runtime';
import type { FragmentReference } from "relay-runtime";
declare export opaque type Container_user$ref: FragmentReference;
declare export opaque type Container_user$fragmentType: Container_user$ref;
export type Container_user = {|
  +id: string,
  +avator: ?string,
  +nickname: ?string,
  +$refType: Container_user$ref,
|};
export type Container_user$data = Container_user;
export type Container_user$key = {
  +$data?: Container_user$data,
  +$fragmentRefs: Container_user$ref,
};
*/


const node/*: ReaderFragment*/ = {
  "kind": "Fragment",
  "name": "Container_user",
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
      "name": "nickname",
      "args": null,
      "storageKey": null
    }
  ]
};
// prettier-ignore
(node/*: any*/).hash = '0e01ff94b9f0e99d9ecb3904a3475858';
module.exports = node;
