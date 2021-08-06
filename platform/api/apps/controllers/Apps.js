/**
 * Read the documentation (https://strapi.io/documentation/3.0.0-beta.x/concepts/controllers.html#core-controllers)
 * to customize this controller
 */
const { sanitizeEntity } = require('strapi-utils');

module.exports = {
  // Loads an index.html
  async download (ctx) {
    const appName = ctx.params.slug
    const appVersion = ctx.params.version || '1.0'
    return { version: appVersion, name: appName }
  },

  async settings(ctx) {
    // bump
    const slug = ctx.params.slug
    const result = await strapi.query('apps').findOne({ slug })
    return sanitizeEntity(result, { model: strapi.models.apps })
  }
}