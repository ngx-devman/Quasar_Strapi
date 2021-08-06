"use strict";

const { parseMultipartData, sanitizeEntity } = require("strapi-utils");
const mysql = require('mysql');
/**
 * Read the documentation (https://strapi.io/documentation/3.0.0-beta.x/concepts/controllers.html#core-controllers)
 * to customize this controller
 */
function updateBody(data, ctx){
  data.forBackupSetting = true
  return data
}

async function update(ctx) {
  const { id } = ctx.params;
  let entity;
  if (ctx.is('multipart')) {
    const { data: _data, files } = parseMultipartData(ctx);
    const data = updateBody(_data, ctx)
    entity = await strapi.services.distribution.update({ id }, data, {
      files,
    });
  } else {
    const data = updateBody(ctx.request.body, ctx)
    entity = await strapi.services.distribution.update({ id }, data);
  }
  return sanitizeEntity(entity, { model: strapi.models.distribution });
}

module.exports = {
  async updateSettings(ctx) {
    console.log("Setting paramater", ctx.request.body);
    let entity;
    if (ctx.is("multipart")) {
      const { data, files } = parseMultipartData(ctx);
      entity = await strapi.services.distribution.update(ctx.params, data, {
        files
      });
    } else {
      entity = await strapi.services.distribution.update(
        ctx.params,
        ctx.request.body
      );
    }
    return sanitizeEntity(entity, { model: strapi.models.distribution });
  },

  async copy(ctx) {
    try {
      // Check if 'from' and 'to' are same
      if(ctx.params.from == ctx.params.to) return ctx.response.badRequest("'from' and 'to' cannot have same value!")
      // Check if 'to' and 'from' distribution exists
      let fromDistributionExists = await strapi.query("distribution").findOne({ id: ctx.params.from }) 
      let toDistributionExists = await strapi.query("distribution").findOne({ id: ctx.params.to }) 
      if(!fromDistributionExists) return ctx.response.badRequest(`'From' Distribution doesn't exists!`)
      if(!toDistributionExists) return ctx.response.badRequest(`'To' Distribution doesn't exists!`)
      // Check if current user is authorized for copying
      const user = await strapi.plugins["users-permissions"].services.user.fetch({ id: ctx.state.user.id })
      let toDistribution = user.distributions.find(dist => dist.id == ctx.params.to)
      if(!toDistribution) return ctx.response.badRequest("Not authorized to copy distribution!")
      // Adjust and copy distribution
      let toCopyDistribution = fromDistributionExists
      // Delete null, undefined values
      Object.keys(toCopyDistribution).forEach(key => {
        if (!toCopyDistribution[key]) {
          delete toCopyDistribution[key];
        }
      })
      toCopyDistribution.creator = ctx.state.user.email
      toCopyDistribution.forBackupSetting = true
      delete toCopyDistribution.slug
      delete toCopyDistribution.name
      let copiedDistribution = await strapi.query("distribution").update({ id: ctx.params.to }, toCopyDistribution)
      // Remove private and sensitive fields
      copiedDistribution = sanitizeEntity(copiedDistribution, { model: strapi.models.distribution })
      return {
        success: true,
        copiedDistribution
      }
    } catch (e) {
      return {
        success: false,
        error: e
      }
    }
  },
  update
};
