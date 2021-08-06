const { sanitizeEntity } = require('strapi-utils');
module.exports = {
  async find(model, ctx, populate) {
    let entities;
    if (ctx.query._q) {
      entities = await strapi.services[model].search(ctx.query, populate);
    } else {
      entities = await strapi.services[model].find(ctx.query, populate);
    }
    return entities.map(entity => sanitizeEntity(entity, { model: strapi.models[model] }));
  },
  async count(model, ctx) {
    if (ctx.query._q) {
      return strapi.services[model].countSearch(ctx.query);
    }
    return strapi.services[model].count(ctx.query);
  }
};
