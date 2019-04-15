const mongoose = require('mongoose');
const child_process = require('child_process');
const util = require('util');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const debug = require('debug')('app:models');

const UserSchema = require('../schema/user');
const { UserModelName, UserCollectionName } = require('./constants');
const role = require('../role');

const UserModel = mongoose.model(UserModelName, UserSchema, UserCollectionName);

const APP_SECRET = process.env.APP_SECRET;
const exec = util.promisify(child_process.exec);

const _login = async ({ email, password }) => {
  const user = await UserModel.findOne({ email }).exec();
  // debug(user);
  if (!user) throw new Error('not found user');
  const valid = await bcrypt.compare(password, user.password);
  if (!valid) throw new Error('invalid password');
  return user;
};

exports.model = UserModel;

exports.adminLogin = async ({ email, password }) => {
  const user = await _login({ email, password });
  if (user.role & role.MANAGER) {
    const token = tokenGen({
      _id: user._id,
      openId: user.openId,
      role: user.role
    });
    return token;
  }
  throw new Error('invalid role');
};

exports.login = async ({ email, password }) => {
  const user = await _login({ email, password });
  const token = tokenGen({ openId: user.openId, _id: user._id });
  return token;
};

exports.changePwd = async ({ _id, password, newPassword }) => {
  const user = await UserModel.findOne({ _id }).exec();
  if (!user) throw new Error('not found user');
  const valid = await bcrypt.compare(password, user.password);
  if (!valid) throw new Error('invalid password');
  const salt = bcrypt.genSaltSync(10);
  const hashPassword = await bcrypt.hash(newPassword, salt);
  await UserModel.updateOne(
    { _id },
    { $set: { password: hashPassword } }
  ).exec();
};
exports.register = async ({ email, password, passwordRe }) => {
  if (password !== passwordRe) throw new Error('password not equal');
  const exists = await UserModel.findOne({ email }).exec();
  if (exists) throw new Error('has exists');
  const openId = await uuidGen();
  const salt = bcrypt.genSaltSync(10);
  const hashPassword = await bcrypt.hash(password, salt);
  const user = new UserModel({
    openId,
    nickname: email,
    email,
    password: hashPassword
    // salt
  });
  await user.save();
  const token = tokenGen({ openId, _id: user._id });
  return token;
};

exports.findOne = async query => {
  const result = await UserModel.findOne(query).exec();
  return result;
};

exports.lists = async query => {
  const result = await UserModel.find(query, {
    avator: 1,
    nickname: 1,
    email: 1,
    createAt: 1
  })
    .sort({ _id: -1 })
    .exec();
  return result;
};

async function uuidGen() {
  const { stdout } = await exec('uuidgen');
  const uuid = Buffer.from(stdout).toString('base64');
  debug({ uuid });
  return uuid;
}

function tokenGen({ openId, _id, role = 0 }) {
  const tokenStr = jwt.sign({ role, openId, _id: _id.toString() }, APP_SECRET);
  return tokenStr;
}

function tokenDec(token) {
  const tokenInfo = jwt.verify(token, APP_SECRET);
  tokenInfo._id = mongoose.Types.ObjectId(tokenInfo._id);
  return tokenInfo;
}

exports.tokenDec = tokenDec;
