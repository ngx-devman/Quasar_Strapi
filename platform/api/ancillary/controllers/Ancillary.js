'use strict';

/**
 * Ancillary data requires the activated sandbox
 * 
 */

/**
 * Read the documentation (https://strapi.io/documentation/3.0.0-beta.x/concepts/controllers.html#core-controllers)
 * to customize this controller
 */

module.exports = {
  find: async(ctx, payload) => {      
    let sandbox = {}

    // If it's a post, use the body to help calculate ancilary data...
    if (ctx.request.body) sandbox = ctx.request.body
    
    // TODO: Set criteria for finding activations...
    let results = await strapi.query("activations").find()
    console.log(`Found ${results.length} activations for ancillary data`)

    const ret = { settings: {}, data: [] }

    // Process the settings for each returned activation...
    results.forEach(activation => {
      // TODO: This would be a merge with settings...
      ret.settings = activation.settings
      
      // TODO: Modify the activation drop time/etc...
      ret.data.push(activation.data)
    })

    // Return the result!
    return {
        success: true,
        data: { settings: ret.settings, data: ret.data }
    }
  }
};
