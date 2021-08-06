'use strict';

/**
 * Shipping.js controller
 *
 * @description: A set of functions called "actions" for managing `Shipping`.
 */

const Taxjar = require('taxjar');

let c;

module.exports = {

  /**
   * Retrieve shipping records.
   *
   * @return {Object|Array}
   */
  create: async (ctx) => {
    try{

      if(isNaN(ctx.request.body.amount)) {
        return {
          success: false,
          message: "Invalid amount!"
        }
      }

      const client = new Taxjar({
        apiKey: strapi.config.get("custom.taxjarAPIKey")
      });

      const taxjarRes = await client.taxForOrder({
        from_country: 'US',
        from_zip: '35006',
        from_state: 'AL',
        to_country: 'US',
        to_zip: '35006',
        to_state: 'AL',
        amount: ctx.request.body.amount,
        shipping: 0,
      });


      return {
        success: true,
        shippingRates: [
          {
            id: 'economy',
            title: 'Economy Shipping (Typical Delivery in 4-7 Business Days)',
            price: 5.95
          },
          {
            id: 'express',
            title: 'Two Business Day Shipping (If order placed by 2 PM EST)',
            price: 14.99
          }
        ],
        tax: taxjarRes.tax.amount_to_collect,
        error: false,
      };
      
    } catch(e) {
      return {
        success: false,
        error: e
      };
    }
  }
};
