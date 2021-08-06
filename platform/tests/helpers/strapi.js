const Strapi = require('strapi');
const http = require('http');
const get = require('lodash/get')
const fs = require('fs')

let instance;

const sleep = (milliseconds) => {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
};

async function setupStrapi() {
  jest.setTimeout(30000);
  if (!instance) {
    /** the following code in copied from `./node_modules/strapi/lib/Strapi.js` */
    await Strapi().load();
    instance = strapi; // strapi is global now
    await instance.app
      .use(instance.router.routes()) // populate KOA routes
      .use(instance.router.allowedMethods()); // populate KOA methods

    instance.server = http.createServer(instance.app.callback());
  }
  return instance;
}

async function cleanupStrapi() {

  const dbSettingsList = {...strapi.config.get('database.connections')};
  await instance.server.close(); // close the server
  await sleep(1000)
  Object.values(dbSettingsList).forEach(dbSettings => {
    const filename = get(dbSettings, 'settings.filename')
    //delete test database after all tests
    if (filename) {
      const tmpDbFile = `${__dirname}/../../../${filename}`
      if (fs.existsSync(tmpDbFile)) {
        fs.unlinkSync(tmpDbFile);
      }
    }
  })

}

module.exports = { setupStrapi, cleanupStrapi };