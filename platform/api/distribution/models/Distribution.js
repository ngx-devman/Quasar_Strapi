"use strict";

/**
 * Lifecycle callbacks for the `Distribution` model.
 */
const generateBackupHook = require("../../../common/generateBackupHook");
const index = "distribution";

module.exports = {
  lifecycles: {
    beforeUpdate: async (params, data) => {
      if (data.forBackupSetting) {
        data.forBackupSetting = false;
        return;
      }

      generateBackupHook(params.id, index, data);
    },
  },
};
