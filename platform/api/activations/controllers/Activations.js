'use strict';

/**
 * Read the documentation (https://strapi.io/documentation/v3.x/concepts/controllers.html#core-controllers)
 * to customize this controller
 */
const { sanitizeEntity } = require('strapi-utils');
module.exports = {
  async populate(ctx) {
    const { sourceVersion } = ctx.query;
    const populatedActivations = await strapi.services.activations.populate(
      ctx.request.body,
      { sourceVersion }
    );
    return populatedActivations;
  },
  async identifier(ctx) {
    const { id } = ctx.params;

    const entity = await strapi
      .query('activations')
      .findOne({ _where: { _or: [{ id }, { slug: id }, { uuid: id }] }});

    return sanitizeEntity(entity, { model: strapi.models.activations });
  }
};
