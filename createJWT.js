const { header, payload } = require("./secret");
const {
  b64Encode,
  b64UrlEncode,
  fs,
  signatureCreation,
} = require("./base64Functions");

const lambda = (header, payload) => {
  let jsonHeader = JSON.stringify(header);
  let jsonPayload = JSON.stringify(payload);

  let b64Header = b64Encode(jsonHeader);
  let b64Payload = b64Encode(jsonPayload);

  signatureCreation.write(b64Header + "." + b64Payload);
  signatureCreation.end();

  let privateKey = fs.readFileSync(__dirname + "/private_key.pem", "utf8");

  let signatureB64 = signatureCreation.sign(privateKey, "base64");
  let signatureB64Url = b64UrlEncode(signatureB64);

  let JWT = `${b64Header}.${b64Payload}.${signatureB64Url}`;

  console.log(`JSON Web Token: ${JWT}`);
  return `JSON Web Token: ${JWT}`;
};

lambda(header, payload);
