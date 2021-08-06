'use strict';

/**
 * Read the documentation (https://strapi.io/documentation/v3.x/concepts/controllers.html#core-controllers)
 * to customize this controller
 */

module.exports = {  

  async byApp(ctx) {
    const app = ctx.params.app
    const result = await strapi.query('updates').find({ app })
    return result
  }
  
};
