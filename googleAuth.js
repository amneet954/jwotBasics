const {
  b64Encode,
  b64UrlEncode,
  signatureCreation,
} = require("./base64Functions");
const { googleEmail, header } = require("./secret");
let privateKey = require("./googlePrivateKeyInfo");

const lambda = () => {
  const currentTime = () => {
    let time = String(Date.now());
    time = Number(time.slice(0, time.length - 3));
    return time;
  };
  const futureTime = () => {
    let time = String(Date.now() + 3600000);
    time = Number(time.slice(0, time.length - 3));
    return time;
  };
  let jsonHeader = JSON.stringify(header);
  let jsonPayload = JSON.stringify({
    iss: googleEmail,
    scope: "https://www.googleapis.com/auth/devstorage.read_only",
    aud: "https://oauth2.googleapis.com/token",
    exp: futureTime(),
    iat: currentTime(),
  });

  let b64Header = b64Encode(jsonHeader);
  let b64Payload = b64Encode(jsonPayload);
  signatureCreation.write(b64Header + "." + b64Payload);
  signatureCreation.end();

  let signatureB64 = signatureCreation.sign(privateKey.private_key, "base64");
  let signatureB64Url = b64UrlEncode(signatureB64);

  let JWT = `${b64Header}.${b64Payload}.${signatureB64Url}`;

  console.log(`JSON Web Token: ${JWT}`);
  return `JSON Web Token: ${JWT}`;
};

lambda();
