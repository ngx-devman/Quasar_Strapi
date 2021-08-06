'use strict';

/**
 * Read the documentation (https://strapi.io/documentation/v3.x/concepts/controllers.html#core-controllers)
 * to customize this controller
 */

const mql = require('@microlink/mql')
module.exports = {
    getData: async (ctx) => {
        try {
            const identifier = ctx.params.identifier
            if(!identifier) {
                return {
                    success: false,
                    message: "Missing way to Identify content"
                }
            }
            const query = isNaN(identifier) ? { slug: identifier } : { id: identifier }  
            const distribution = await strapi.query("distribution").findOne(query)
            if(!distribution) {
                return {
                    success: false,
                    message: "Content not found"
                }
            }
            let environment =
            distribution.settings &&
            distribution.settings.sourceCode &&
            distribution.settings.sourceCode.environment
              ? distribution.settings.sourceCode.environment
              : null;

            if (!environment) {
                const domain = await strapi.query("domain").findOne({ Name: 'Default' })
                environment = domain.settings.sourceCode.environment || 'local'
            }
            environment = environment === "local" ? "production" : environment
            const url = strapi.config.get("custom.environments.front")[environment]
            const { data } = await mql(`${url}/${identifier}`, {
                video: true
            })
            return data
        } catch(e) {
            return {
                success: false,
                message: "A general error occurred"
            }
        }
    }
};
