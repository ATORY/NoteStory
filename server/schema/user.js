const { Schema } = require('mongoose');

const UserSchema = new Schema(
  {
    openId: { type: String, default: '' },
    nickname: { type: String, default: '' },
    intro: { type: String, default: '' },
    avator: { type: String, default: '' },
    banner: { type: String, default: '' },
    email: { type: String, default: '' },
    password: { type: String, default: '' },
    salt: { type: String, default: '' },
    role: { type: Number, default: 0 }
  },
  { timestamps: true }
);

UserSchema.index({ openId: 1 });
UserSchema.index({ email: 1 });

module.exports = UserSchema;
