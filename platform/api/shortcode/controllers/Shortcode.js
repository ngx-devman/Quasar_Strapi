'use strict';

/**
 * Read the documentation (https://strapi.io/documentation/3.0.0-beta.x/concepts/controllers.html#core-controllers)
 * to customize this controller
 */

module.exports = {
    findOne: async ctx => {
        // Get the shortcode...
        const result = await strapi.services.shortcode.find( { code: ctx.params.id })
        
        if (result) {
            // Adjust the record (increment the counter)...
            await strapi.services.shortcode.update({ id: result[0].id }, { counter: parseInt(result[0].counter) + 1 } )
            
            // Return it to the user...
            return {
                success: true,
                data: result[0]
            }
        }

        return {
            success: false
        }
    }
};
