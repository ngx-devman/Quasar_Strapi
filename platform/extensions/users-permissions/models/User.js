"use strict";

/**
 * Read the documentation (https://strapi.io/documentation/v3.x/concepts/models.html#life-cycle-callbacks)
 * to customize this model
 */
const generateBackupHook = require("../../../common/generateBackupHook");
const { sanitizeEntity } = require('strapi-utils');
module.exports = {
  lifecycles: {
    beforeUpdate: async (params, data) => {
      const user = await strapi.plugins[
        "users-permissions"
      ].services.user.fetch({ id: params.id });

      generateBackupHook(params.id, "users", data, user);
    }
  }
};
