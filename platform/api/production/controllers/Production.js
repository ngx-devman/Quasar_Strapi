"use strict";

/**
 * Read the documentation (https://strapi.io/documentation/v3.x/concepts/controllers.html#core-controllers)
 * to customize this controller
 */

module.exports = {
  mapEidr: async (ctx) => {
    const ids = ctx.request.body;
    return await strapi.query("production").find({ _where: { clientId: ids }, _limit: -1 });
  },
};
