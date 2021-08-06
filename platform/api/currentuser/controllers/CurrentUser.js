const { sanitizeEntity } = require('strapi-utils');
const { find, count } = require('../../../common/default-controller-methods');

module.exports = {
  async get(ctx) {
    ctx.params = { id: ctx.state.user.id }
    const user = await strapi.plugins['users-permissions'].controllers.user.findOne(ctx);
    return user;
  },
  async update(ctx) {
    // override id by logged in user's id
    ctx.params.id = ctx.state.user.id;
    if(!ctx.request.body) return ctx.badRequest();
    // password should be updated by separate api
    delete ctx.request.body.password;
    delete ctx.request.body.features;
    const response = await strapi.plugins['users-permissions'].controllers.user.update(ctx);
    return response;
  },
  // This call "replaces" media file
  async updatePhoto(ctx) {
    if(!ctx.request.files || !ctx.request.files['files.photo']) return ctx.badRequest();
    const user = await strapi.plugins['users-permissions'].services.user.fetch(ctx.state.user.id, ['photo']);
    const id = user.photo ? user.photo.id : null;
    const file = ctx.request.files['files.photo']
    file.name = 'avatar_photo'
    const refId = ctx.state.user.id;
    ctx.query.id = id;
    ctx.request.body = {
      ref: 'user',
      refId,
      field: 'photo',
      source: 'users-permissions'
    }
    ctx.request.files = { files: file }
    return await strapi.plugins['upload'].controllers.upload.upload(ctx);
  },
  async getMediaFiles(ctx) {
    // policy takes care of filtering
    return await find('user-media', ctx, ['file', 'parent']);
  },
  async countMediaFiles(ctx) {
    // policy takes care of filtering
    return await count('user-media', ctx);
  },
  async getMediaFolders(ctx) {
    // policy takes care of filtering
    return await find('user-media-folder', ctx, []);
  },
  async getMediaFolder(ctx) {
    // Required for retrieving folder hierarchy
    const {id} = ctx.params;
    if(!id) return ctx.badData('id must be populated.');
    return await strapi.services['user-media-folder'].getMediaFolderWithPath(id, ctx.state.user.id);
  },
  changePass: async (ctx) => {
    const formatError = error => [
      { messages: [{ id: error.id, message: error.message, field: error.field }] },
    ];

    // if no password, then return error
    if (!ctx.request.body.password) {
      return ctx.badRequest(
        null,
        formatError({
          id: 'Auth.form.error.password.provide',
          message: 'Please provide your password.',
        })
      );
    }
    // otherwise, check the password for validity
    const validPassword = await strapi.plugins[
      'users-permissions'
    ].services.user.validatePassword(ctx.request.body.password, ctx.state.user.password);

    if (validPassword) {
      const newPass = await strapi.admin.services.auth.hashPassword(ctx.request.body.newPassword)
      const entity = await strapi.query('user', 'users-permissions').update({ id: ctx.state.user.id }, { password: newPass })

      return sanitizeEntity(entity, { model: strapi.plugins['users-permissions'].models.user })
    } else {
      // else, return an error
      return ctx.badRequest(null, formatError({
        id: 'Auth.form.error.invalid',
        message: 'Password invalid.',
      }));
    }
  }
};
