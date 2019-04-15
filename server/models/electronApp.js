/**
 * electron app 统计
 */
const mongoose = require('mongoose');
const debug = require('debug')('app:models:electronApp');
const ElectronAppSchema = mongoose.Schema(require('../schema/electronApp'));

ElectronAppSchema.index({ openId: 1 });
ElectronAppSchema.index({ appVersion: 1 });
ElectronAppSchema.index({ machineId: 1 });
ElectronAppSchema.index({ openId: 1, machineId: 1 });

const ElectronAppModel = mongoose.model(
  'electronApp',
  ElectronAppSchema,
  'electronApp'
);

exports.record = async data => {
  let result = {};
  try {
    result = await ElectronAppModel.create(data);
  } catch (error) {
    debug(error);
  }
  return result;
};

exports.installed = async () => {
  const machines = await ElectronAppModel.aggregate([
    {
      $group: {
        _id: '$machineId',
        appVersion: { $first: '$appVersion' },
        platform: { $first: '$platform' }
        // "categoryId": { "$first": "$categoryId"},
      }
    },
    { $project: { appVersion: 1, platform: 1 } }
  ]);
  // debug({ maxRelease });
  return machines;
};

exports.ElectronAppModel = ElectronAppModel;
