const { generateHmac } = require('./encrypt')
const axios = require('axios')
const SIGNATURE_SEPARATOR = "\n";

// Generate string to be signed
const generateSignature = (
  httpMethod,
  url,
  secretKey
) => {
  const urlObj = typeof url === 'string' ? new URL(url) : url;  
  const data = [httpMethod, urlObj.hostname, urlObj.pathname, urlObj.searchParams.toString()];
  return generateHmac(data.filter(i=>!!i && i.length > 0).join(SIGNATURE_SEPARATOR), secretKey)
};

const request = async ({method = 'GET', url, ...rest}, { secretKey }) => {
  const requestUrl = new URL(url)
  
  //append mtg signature to query params
  const signature = generateSignature(method, requestUrl, secretKey)
  requestUrl.searchParams.append('signature', signature)
  
  const { data } = await axios({ method, url: requestUrl.toString(), ...rest });
  return data
}

const getFeedIdFromSlug = (slug) => {
  const [, ...feedIdArr] = slug.split("-");
  return feedIdArr.length > 0 ? feedIdArr.join('') : null
}

module.exports = {
  generateSignature,
  request,
  getFeedIdFromSlug
}