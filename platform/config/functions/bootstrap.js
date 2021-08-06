"use strict";
const _ = require('lodash');
/**
 * An asynchronous bootstrap function that runs before
 * your application gets started.
 *
 * This gives you an opportunity to set up your data model,
 * run jobs, or perform some special logic.
 *
 * See more details here: https://strapi.io/documentation/v3.x/concepts/configurations.html#bootstrap
 */

function logMemoryUsage() {
  const used = process.memoryUsage();
  for (let key in used) {
    console.log(
      `${key} ${Math.round((used[key] / 1024 / 1024) * 100) / 100} MB`
    );
  }
}

function initSocketIo() {
  let numUsers = 0;
  process.nextTick(() => {
    const io = require("socket.io")(strapi.server);

    io.on("connection", (socket) => {
      numUsers += 1;

      socket.on("auth", async (payload) => {
        const user = await strapi.plugins[
          "users-permissions"
        ].services.jwt.verify(payload.data);
        const userDetails = await strapi
          .query("user", "users-permissions")
          .findOne({ id: user.id });
        console.log("auth:", userDetails, payload.data);

        socket.emit("update", {
          path: "user",
          data: userDetails || {},
        });
      });

      socket.on("remote", (data) => {
        socket.broadcast.emit("remote", data);
      });

      socket.on("cursor", (data) => {
        socket.broadcast.emit("cursor", data);
      });

      socket.on("chatMessage", (data) => {
        socket.broadcast.emit("chatMessage", data);
      });

      socket.on("disconnect", () => {
        numUsers -= 1;
        socket.broadcast.emit("userLeave", {});
      });
    });
    strapi.io = io; // register socket io inside strapi main object to use it globally anywhere
  });
}

/**
 * Initialize roles and permissions configured for the environment.
 * See config/env/<env name>/default-permissions.js
 * https://stackoverflow.com/questions/57106760/bootstraping-new-strapi-role-permissions
 */
async function initUsersPermissions() {
  const roles = strapi.config.get('bootstrapConfig.permissions.data', [])
  if(!roles || roles.length === 0) return
  strapi.log.debug(`${roles.length} default roles detected. Updating db...`)
  const service = strapi.plugins['users-permissions'].services.userspermissions;
  const plugins = await service.getPlugins(); // by default lang="en"
  let existingRoles = await service.getRoles();

  const missingRoles = roles.filter(role => existingRoles.every(x => x.type !== role.type ))
  
  // Create missing roles...
  for(const role of missingRoles) {
    await service.createRole(_.pick(role, ['type', 'name', 'description']));
  }

  // Unfortunately `createRole` does not return created role id.
  // Therefore fetch roles again...
  existingRoles = await service.getRoles();

  for(const role of roles) {
    const {id} = existingRoles.find(i=> i.type === role.type);
    const existingRole = await service.getRole(id, plugins);
    _.merge(existingRole, _.pick(role, ['name', 'description']))
    Object.keys(role.permissions).forEach(pluginName => {
      Object.keys(role.permissions[pluginName].controllers).forEach(ctrlName => {
        const existingController = existingRole.permissions[pluginName].controllers[ctrlName]
        const newController = role.permissions[pluginName].controllers[ctrlName]
        if(typeof newController === 'boolean') {
          Object.keys(existingController).forEach(action => {
            existingController[action].enabled = newController
          })
        } else {
          _.merge(existingController, newController) 
        }
      })
    })
    await service.updateRole(id, existingRole);
  }
  
}

async function initContentManager() {
  const data = strapi.config.get('bootstrapConfig.contentManager.data', [])
  if(!data || data.length === 0) return
  
}

module.exports = async () => { 
  logMemoryUsage()
  initSocketIo()
  if(process.env.SOURCE_BOOTSTRAP) {
    await initUsersPermissions()
    await initContentManager()
  }
  // clear bootstrapConfig from memory
  strapi.config.set('bootstrapConfig', undefined)
};
