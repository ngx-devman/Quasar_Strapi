const generateBackupHook = require("../../../common/generateBackupHook");
const uuid = require("uuid").v4;
module.exports = {
  lifecycles: {
    // Called before an entry is created
    beforeCreate(data) {
      data.uuid = uuid();
    },
    beforeUpdate: async (params, data) => {
      generateBackupHook(params.id, "activations", data);
    },
  },
};
