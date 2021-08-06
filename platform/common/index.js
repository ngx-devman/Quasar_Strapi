const NodeCache = require('node-cache');
const config = require('config');
const path = require('path');

const responseFormatter = require("./productResponseFormatter")

const clientConfigCache = new NodeCache( { stdTTL: config.cache.clientConfig.ttl } );

// Returns the top-most folder for the current path.
const folderFor = (name) => path.dirname(name).split(path.sep).pop();

// like folderFor, but with a prepended '/' and appending optional stuff.
const endpointFor = (name, append = '') => `/${folderFor(name)}${append}`;

// Returns a client configuration, using cache first.
async function getClientConfig(client) {
  // Fixes bug in people using uppercase or CamelCase names in Kurator...
  client = client.toLowerCase();
  const config = clientConfigCache.get(client);
  if (config) {
    console.log(`Client Config cache hit: ${client}`);
    return config;
  } else {
    console.log(`Client Config cache miss: ${client}`);
    const data = (await strapi.query('distribution').findOne({ id : client }));
    const defaultProvider = data.settings.ecommerce.defaultProvider

    const providers = {
      shopify: "sourceDigitalShopify",
      wooCommerce: "sourceDigitalWooCommerce",
      magento: "sourceDigitalMagento",
      fastSpring: "sourceDigitalFastSpring"
    }

    console.log(data.settings.ecommerce.defaultProvider)
    const newConfig = data.settings.ecommerce.storefronts[providers[defaultProvider]]
    clientConfigCache.set(client, newConfig);
    return newConfig;
  }
}

// Returns an endpoint for a client, based on their configured platform and enpoint name...
async function getClientEcommerce(opts) {
  const { name, client, id, platforms } = opts;
  const config = await getClientConfig(client);
  return await platforms[config.provider](config, name, id);
}

module.exports = {
  endpointFor,
  folderFor,
  getClientConfig,
  getClientEcommerce
};