'use strict';

/**
 * `user-media-folder` service.
 */
const maxFolderPath = 5;
const { sanitizeEntity } = require('strapi-utils');
const pick = require('lodash/pick');
const qs = require('qs');

function unpopulateFolder(item){
  let parent = null;
  if(item.parent) {
    parent = typeof item.parent === 'object' ? item.parent.id : item.parent;
  } 
  return {
    ...pick(item, ['title', 'id']),
    parent
  };
}

module.exports = {
  async getMediaFolderWithPath(id, userId) {
    const entity = await strapi.services['user-media-folder'].findOne(
      qs.parse({_where: [{id}, { 'owner.id': userId }]}),
      ['parent']
    );
    const folder = sanitizeEntity(entity, { model: strapi.models['user-media-folder'] });
    const path = [];
    let parent = folder.parent;
    delete folder.parent;
    if(parent) {
      path.unshift(unpopulateFolder(parent));
      parent = parent.parent;
      while(parent && path.length < maxFolderPath) {
        const parentEntity = await strapi.services['user-media-folder'].findOne(
          qs.parse({_where: [{ id: parent }, { 'owner.id': userId }]}),
          ['parent']
        );
        path.unshift(unpopulateFolder(parentEntity));
        if(parentEntity.parent) {
          path.unshift(unpopulateFolder(parentEntity.parent));
          parent = parentEntity.parent.parent;
        } else {
          parent = null;
        }
      }
    }
    return {
      folder,
      path
    };
  }
};
