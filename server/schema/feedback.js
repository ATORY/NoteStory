module.exports = {
  openId: { type: String, default: '' },
  appVersion: { type: String, default: '' },
  machineId: { type: String, default: '' },
  platform: { type: String, default: '' },
  arch: { type: String, default: '' },
  release: { type: String, default: '' },
  content: { type: String, default: '' },
  // reply: { type: String, default: {} },
  createAt: { type: Date, default: Date.now }
};
