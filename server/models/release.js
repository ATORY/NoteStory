const mongoose = require('mongoose');
// eslint-disable-next-line no-unused-vars
const debug = require('debug')('app:models:release');
const ReleaseSchema = require('../schema/release');
const { ReleaseCollectionName, ReleaseModelName } = require('./constants');

const ReleaseModel = mongoose.model(
  ReleaseModelName,
  ReleaseSchema,
  ReleaseCollectionName
);
exports.model = ReleaseModel;

const CURR_VALID_RELEASE = [];

exports.CURR_VALID_RELEASE = CURR_VALID_RELEASE;

// maxVersion();

// async function maxVersion() {
//   const max = await ReleaseModel.aggregate([
//     { $group: { _id: null, version: { $max: '$version' } } },
//     { $project: { _id: 0, version: 1 } }
//   ]);
//   debug({ max });
// }
job();
debug('after job');
setInterval(job, 12 * 60 * 60 * 1000);
function job() {
  loadMaxVersionRelease().then(data => {
    CURR_VALID_RELEASE.length = 0;
    data.forEach((item, index) => {
      CURR_VALID_RELEASE[index] = item;
    });
    debug(CURR_VALID_RELEASE);
  });
}

async function loadMaxVersionRelease() {
  const maxRelease = await ReleaseModel.aggregate([
    {
      $group: {
        _id: '$platform',
        version: { $max: '$version' },
        release: { $first: '$release' }
        // "categoryId": { "$first": "$categoryId"},
      }
    },
    { $project: { version: 1, release: 1 } }
  ]);
  // debug({ maxRelease });
  return maxRelease;
}

exports.allRelease = async () => {
  const lists = await ReleaseModel.find().exec();
  return lists;
};
