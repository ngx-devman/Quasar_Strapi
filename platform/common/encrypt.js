const crypto = require("crypto");

// Generate signature to sign outgoing request
const generateHmac = (data, secretKey, algorithm = 'sha1', encoding = 'base64') => {
  return crypto.createHmac(algorithm, secretKey).update(data).digest(encoding);
};

module.exports = {
  generateHmac
}