const CryptoJS = require('crypto-js');
const removeMD = require('remove-markdown');

const defaultSecret = 'notestory';
const plainTextLen = 50;

const debug = /--debug/.test(process.argv[2]);

const encContent = (content, key) => {
  const secretKey = `${defaultSecret}&${key}`;
  const mdStrEnc = CryptoJS.AES.encrypt(content, secretKey);
  return mdStrEnc.toString();
};
exports.encContent = encContent;

const decContent = (content, key, title) => {
  try {
    const secretKey = `${defaultSecret}&${key}`;
    const bytes = CryptoJS.AES.decrypt(content, secretKey);
    const plaintext = bytes.toString(CryptoJS.enc.Utf8);
    return plaintext;
  } catch (error) {
    if (debug) {
      console.error(error);
      console.log({ title });
    }
  }
  return '';
};
exports.decContent = decContent;

// eslint-disable-next-line no-unused-vars
const mdStrToPlainText = (content, key) => {
  // const mdStr = decContent(content, key);
  const mdStr = content;
  const plainText = removeMD(mdStr);
  if (plainText.length <= plainTextLen) {
    return plainText;
  }
  return plainText.substr(0, plainTextLen);
};
exports.mdStrToPlainText = mdStrToPlainText;
