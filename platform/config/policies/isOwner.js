'use strict';
/**
 * `isOwner` policy.
 */


const { parseMultipartData } = require('strapi-utils');
const modelNameMap = {
  distributions: 'distribution',
  'user-medias': 'user-media',
  'user-app-blocks': 'user-app-block'
};
const errMsg = 'You are not allowed to perform this action.';

function setOwner(ctx, id) {
  if(!ctx.is('multipart')) {
    ctx.request.body.owner = id.toString();
    return;
  } else {
    const data = parseMultipartData(ctx).data;
    data.owner = id;
    ctx.request.body.data = JSON.stringify(data);
  }
}

module.exports = async (ctx, next) => {

  const { id, role } = ctx.state.user;

  if (typeof id === 'undefined' || id === null) {
    return ctx.unauthorized(`${errMsg} [1]`);
  }

  // If it is service account, pass
  if (role && role.type && role.type.startsWith('serviceaccount-')) {
    await next();
    return;
  }

  // [find, count] Only query entities that owned by the current user
  if (ctx.request.method === 'GET') {
    // Remove everything about owner in the query eg. owner.id_in, owner.id, owner etc.
    for (let key in ctx.query) {
      if (key.startsWith('owner')) {
        delete ctx.query[key];
      }
    }

    // Reset owner.id to current user id
    ctx.query = Object.assign({ 'owner.id': id }, ctx.query);
  }

  // [update, delete] Check owner of an existing entity
  if ((ctx.request.method === 'DELETE' || ctx.request.method === 'PUT') && typeof ctx.params !== 'undefined' && ctx.params !== null && typeof ctx.params.id !== 'undefined' && ctx.params.id !== null && ctx.params.id !== '') {
    // Extract model name from request path eg. /messages/15
    const modelName = ctx.request.path.match(/^\/(.*)\/\d*$/);
    if (Array.isArray(modelName) === false || modelName[1] === '') {
      return ctx.unauthorized(`Invalid request ${ctx.request.path}`);
    }
    const modelNameMap = {
      distributions: 'distribution',
      'user-app-blocks': 'user-app-block',
      'user-medias': 'user-media',
      'user-media-folders': 'user-media-folder'
    }
    let mappedModelName = modelNameMap[modelName[1]] || modelName[1];
    mappedModelName = modelNameMap[mappedModelName] || mappedModelName
    // Get existing entity and check for ownership
    const existingEntity = await strapi.query(mappedModelName).findOne({
      id: ctx.params.id
    });
    if (typeof existingEntity === 'undefined' || existingEntity === null) {
      return ctx.notFound('Not Found');
    }

    if (typeof existingEntity.owner === 'undefined' || existingEntity.owner === null || typeof existingEntity.owner.id === 'undefined' || existingEntity.owner.id === null || existingEntity.owner.id.toString() !== id.toString()) {
      return ctx.unauthorized(`${errMsg} [2]`);
    }

    setOwner(ctx, id);
  }

  // [create] Set owner for a new entity
  if (ctx.request.method === 'POST') {
    setOwner(ctx, id);
  }
  
  await next();
  
  
  // [find.one] Only query entities that owned by the current user
  if (ctx.request.method === 'GET') {
    if (Object.prototype.toString.call(ctx.response.body) === '[object Object]') {
      if (typeof ctx.response.body.owner === 'undefined' || ctx.response.body.owner === null || typeof ctx.response.body.owner.id === 'undefined' || ctx.response.body.owner.id === null || ctx.response.body.owner.id.toString() !== id.toString()) {
        return ctx.unauthorized(`${errMsg} [3]`);
      }
    }
  }

};