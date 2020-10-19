const crypto = require("crypto");
const fs = require("fs");
const signatureCreation = crypto.createSign("RSA-SHA256");
const verifySignature = crypto.createVerify("RSA-SHA256");

const b64Encode = (obj) => {
  return Buffer.from(obj)
    .toString("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/g, "");
};

const b64UrlEncode = (string) => {
  return string.replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/g, "");
};

const b64Decode = (string) => {
  string = string.replace(/\-/g, "+").replace(/\_/g, "/");
  while (string.length % 4) {
    string += "=";
  }
  return string;
};

module.exports = {
  b64Encode,
  b64UrlEncode,
  b64Decode,
  fs,
  signatureCreation,
  verifySignature,
};
