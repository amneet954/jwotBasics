const { JWT } = require("./secret");
const {
  b64Encode,
  b64UrlEncode,
  b64Decode,
  fs,
  verifySignature,
  signatureCreation,
} = require("./base64Functions");

const lambda = () => {
  const publicKey = fs.readFileSync(__dirname + "/public_key.pem", "utf8");
  const JWTSplit = JWT.split(".");

  const header = JWTSplit[0];
  const payload = JWTSplit[1];
  const signature = JWTSplit[2];

  verifySignature.write(`${header}.${payload}`);
  verifySignature.end();

  const jwtSignatureBase64 = b64Decode(signature);
  const signatureIsValid = verifySignature.verify(
    publicKey,
    jwtSignatureBase64,
    "base64"
  );

  console.log(signatureIsValid);
  return signatureIsValid;
};

lambda();
