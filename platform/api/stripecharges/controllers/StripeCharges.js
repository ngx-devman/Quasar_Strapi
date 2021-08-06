'use strict';

/**
 * StripeCharges.js controller
 *
 * @description: A set of functions called "actions" for managing `StripeCharges`.
 */


let stripe = require("stripe")

module.exports = {

  /**
   * Retrieve stripeCharges records.
   *
   * @return {Object|Array}
   */

  create: async (ctx) => {
    stripe = stripe(strapi.config.stripe.secretKey)

    const data = ctx.request.body
    
    if (Array.isArray(data)) {
      return Promise.all(data.map(current => stripe.charges.create(current)));
    }
    
    return data;
  } 
};
