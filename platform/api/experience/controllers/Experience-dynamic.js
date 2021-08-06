const { sanitizeEntity } = require("strapi-utils");
const axios = require("axios");
const QueryString = require("query-string");
const { generateHmac } = require('../../../common/encrypt')

// Fetch dynamic distribution data
const fetchDistroData = async (url) => {
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (e) {
    return null;
  }
};
// Generate string to be signed
const generateStringToSign = (
  httpMethod,
  host,
  requestURI = "/",
  queryString
) => {
  const seperator = "\n";
  let toSignString = "";
  // Removes port number 80|443|0 from host
  let hostServer = host ? host.replace(/:(80|443|0)?$/, "") : host;
  toSignString += `${httpMethod}${seperator}${hostServer}${seperator}${requestURI}`;
  const parameters = QueryString.parse(queryString);
  if (Object.keys(parameters).length > 0) {
    toSignString += seperator;
    toSignString += QueryString.stringify(parameters);
  }
  return toSignString;
};

module.exports = async (slug) => {
  const [distroName, ...feedIdArr] = slug.split("-");
  const feedId = feedIdArr.join("");
  let dynamicContent = await strapi.query("dynamic-content").findOne({
    name: distroName,
  });
  if (!dynamicContent) {
    return null;
  }
  let distribution = await strapi.query("distribution").findOne({
    slug,
  });
  if (!distribution) {
    // Load all necessary data required to fetch distro.
    let {
      SECRET_KEY,
      httpMethod,
      host,
      requestURI,
      queryString,
      paramSignature,
      urlPrefix,
      production,
      property,
    } = dynamicContent.hidden;
    // Add feedId/videoId to requestURI
    requestURI += feedId;
    // Create a string to sign the request
    const stringToSign = generateStringToSign(
      httpMethod,
      host,
      requestURI,
      queryString
    );
    // Generate a signature using the string to sign outgoing request
    const generatedSignature = generateHmac(stringToSign, SECRET_KEY);
    // Construct Url to send request.
    const generatedURL = `${urlPrefix}${host}${requestURI}?${queryString}${paramSignature}${generatedSignature}`;
    const contentData = await fetchDistroData(generatedURL);
    if (!contentData) {
      return null;
    }
    let newProduction = null;
    // Create new production, only if 'production' property is true
    if (production) {
      property = await strapi.query("property").findOne({ Name: property });
      newProduction = await strapi.query("production").create({
        name: contentData.video.title,
        property: property ? property.id : null,
        type: "video",
        media: contentData.video.downloadUrl,
        clientId: feedId,
      });
    }

    const promises = [];
    let activations = [];
    // fetch activation depends on its name
    const getActivation = async (key) => {
      return await strapi.query("activations").findOne({ name: key });
    };

    if (contentData.keywords && contentData.keywords.length > 0) {
      contentData.keywords.forEach((key) => promises.push(getActivation(key)));
    }

    return Promise.all(promises)
    .then(async (result) => {
      activations = result 
      activations = activations.map(
        (item) =>
          item && {
            externalId: item.id,
            id: item.name,
            startTimeMs: item.data.startTimeMs,
            endTimeMs: item.data.endTimeMs,
          }
      ).filter(element => !!element)
      distribution = await strapi.query("distribution").create({
        name: contentData.video.title,
        production: newProduction ? newProduction.id : null,
        settings: dynamicContent.settings,
        data: activations,
        type: "overlay",
        slug,
        clientId: feedId,
      });
  
      return sanitizeEntity(distribution, { model: strapi.models.distribution });
     })
    .catch((err) => { 
      console.error(err)
      return null
    });
  }
};
