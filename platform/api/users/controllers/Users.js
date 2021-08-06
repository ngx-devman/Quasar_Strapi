'use strict';

/**
 * Users.js controller
 *
 * @description: A set of functions called "actions" for managing `Users`.
 */


module.exports = {

  /**
   * Retrieve users records.
   *
   * @return {Object|Array}
   */


  // deprecated
  viewInfo: async (ctx, next) => {
    return strapi.plugins["users-permissions"].services.user.fetch({ id: ctx.state.user.id })
  },

  addShipping: async (ctx, next) => {
    return strapi.plugins["users-permissions"].services.user.edit({ id: ctx.state.user.id }, ctx.request.body)
  },

  addBilling: async (ctx, next) => {
    return strapi.plugins["users-permissions"].services.user.edit({ id: ctx.state.user.id }, ctx.request.body)
  }
};
