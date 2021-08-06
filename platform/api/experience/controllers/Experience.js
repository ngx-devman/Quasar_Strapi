/**
 * Read the documentation (https://strapi.io/documentation/3.0.0-beta.x/concepts/controllers.html#core-controllers)
 * to customize this controller
 */
const timer = require('./Experience-common').timer();
const methodController = require('./Experience-method');

// The Source Code layer for the layer builder! Build-ception!
const plugins = require('../common/plugins');
const Tpl = require('nano-var-template');

const template = {
  vars: Tpl({ start: '{{', end: '}}' }),
  plugins: Tpl({ start: '#{', end: '}', functions: true })
};
// This gets filled in later
const data = { plugins: {}, data: {} };
const fs = require('fs');
const index = fs.readFileSync(__dirname + '/index.html', 'utf8');
const getCookie = (cookies, cookieName) => {
  let value = '; ' + cookies;
  let parts = value.split('; ' + cookieName + '=');
  if (parts.length == 2) return parts.pop().split(';').shift();
};

// Build's the script path based on the settings.sourceCode path

module.exports = {
  // Loads user data...
  async user(ctx) {
    if (ctx.state.user) {
      strapi.log.info('User already authorized', { user: ctx.state.user.id });
      return await strapi.query('user', 'users-permissions').findOne({ id: ctx.state.user.id });
    }

    const cookies = ctx.request.header.cookie;
    const JWT = getCookie(cookies, 'jwt');
    let user = {};
    // If the user exists...
    if (JWT) {
      try {
        const unpackedJWT = await strapi.plugins['users-permissions'].services.jwt.verify(JWT);
        strapi.log.debug('Unpacked JWT', unpackedJWT);
        user = await strapi.query('user', 'users-permissions').findOne({ id: unpackedJWT.id });
        strapi.log.info('Got user from Cookie', { user: user.id });
      } catch (e) {
        strapi.log.warn('Invalid JWT', e);
        return user;
      }
    }
    return user;
  },
  // Loads a *cachable* distribution data set, with everything weaved into a single call...
  async data(ctx, fromSelf = false) {
    return await strapi.services.experience.data(ctx, fromSelf);
  },
  // Loads a *cachable* distribution index.html, with everything weaved into a single call...
  async index(ctx) {
    /*
    // TODO: GCP Pub/Sub connection. Use this to invalidate caches, get blacklists, and let clients know that their distribution has changed...
    require('dotenv').config();
    const { PubSub } = require('@google-cloud/pubsub')

    async function quickstart(projectId = 'sage-mind-254718', topicName = 'sourcesync-platform2') {
      // Instantiates a client
      const pubsub = new PubSub({ projectId });
      // Creates the new topic
      const [topic] = await pubsub.createTopic(topicName);
      console.log(`Topic ${topic.name} created.`);
    }
    await quickstart()
    */

    timer.start();
    const payload = await this.data(ctx, true);
    data.plugins.settings = () => JSON.stringify(payload);
    data.plugins.source = () => plugins.source(payload.config.settings.sourceCode);
    data.plugins.sourceVersion = () => plugins.sourceVersion(payload.config.settings.sourceCode);
    try {
      var HTMLtemplate = template.plugins(template.vars(index, payload.config.settings), data.plugins);
      strapi.log.info(`Distribution index.html generated for "${ctx.params.id}" in ${timer.end()}ms`);
      return HTMLtemplate;
    } catch (e) {
      // nano-var-template throws string which is causing Strapi to swallow error messages
      if(typeof e === 'string') throw new Error(e)
      else throw e
    }
  },
  // Executes a distribution method...
  async method(ctx) {
    timer.start();
    const name = ctx.params.name;
    const payload = await this.data(ctx);
    const result = await methodController(ctx, payload);
    strapi.log.info(`Distribution method "${name}" executed in ${timer.end()}ms`);
    return result;
  }
};

