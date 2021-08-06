const { parseMultipartData, sanitizeEntity } = require('strapi-utils');

async function cascadeDeleteUserMediaFile(ctx, id) {
  const existingUserMedia = await strapi.services['user-media'].findOne({ id });
  if(!existingUserMedia) return ctx.notFound();
  const file = existingUserMedia.file && existingUserMedia.file.id ? await strapi.plugins['upload'].services.upload.fetch({ id: existingUserMedia.file.id }) : null;
  if (!file) {
    console.warn('[user-media] The related file is already deleted. id:' + id);
  } else
    await strapi.plugins['upload'].services.upload.remove(file);
}

/**
   * Cascade update user-media.file
   */
async function update(ctx) {
  const { id } = ctx.params;
  let entity;
  if (ctx.is('multipart')) {
    const {data, files} = parseMultipartData(ctx);
    if (files && files.length > 0) {
      await cascadeDeleteUserMediaFile(ctx, id);
    }
    entity = await strapi.services['user-media'].update({ id }, data, { files });
  } else {
    entity = await strapi.services['user-media'].update({ id }, ctx.request.body);
  }
  
  return sanitizeEntity(entity, { model: strapi.models['user-media'] });
}

/**
   * Cascade delete user-media.file
   */
async function deleteFn(ctx) {
  const { id } = ctx.params;
  await cascadeDeleteUserMediaFile(ctx, id);
  const entity = await strapi.services['user-media'].delete({ id });
  return sanitizeEntity(entity, { model: strapi.models['user-media'] });
}

module.exports = {  
  update,
  delete: deleteFn
};


