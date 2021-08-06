"use strict";

/**
 * Read the documentation (https://strapi.io/documentation/v3.x/concepts/models.html#life-cycle-callbacks)
 * to customize this model
 */
const generateBackupHook = require("../../../common/generateBackupHook");

module.exports = {
  lifecycles: {
    beforeUpdate: async (params, data) => {
      generateBackupHook(params.id, "production", data);
    },
  },
};
