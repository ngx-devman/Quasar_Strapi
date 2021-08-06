'use strict';


const { sanitizeEntity } = require('strapi-utils');
const semver = require('semver');
const merge = require('lodash/merge');
const qs = require('qs');
const get = require('lodash/get');

/**
 * Read the documentation (https://strapi.io/documentation/v3.x/concepts/services.html#core-services)
 * to customize this service
 */

const getSupportedActivationVersion = (sourceVersion) => {
  if(sourceVersion && semver.valid(sourceVersion) && semver.satisfies(sourceVersion, '>=0.5.0')) {
    return 2;
  }
  return 1;
};

const filterBySupported = (sourceVersion, activations) => {
  if(!activations) return activations;
  const supported = getSupportedActivationVersion(sourceVersion);
  return activations.filter(a => a.version <= supported);
};

/**
   * Merge activations from activations table
   * @param {Array.<Activation>} activations 
   * @param {Number} supportedActivationVersion 
   */
async function populate(activations, opts = {}) {

  // Loop through each activation and see if any are external...
  const externalIds = activations.filter(i => !!i.externalId).map(i => i.externalId);
  if (externalIds.length === 0) { return activations; }

  // Get a list of requested external activations...
  const externalActivationsMap = await strapi.query('activations')
    .find(qs.parse({
      _where: [
        { id_in: externalIds },
        { _or: [
          { version_lte: getSupportedActivationVersion(opts.sourceVersion) },
          { version_null: true }
        ]}
      ]
    }))
    .then(list => list.reduce((map, curr) => {
      map[curr.id] = curr;
      return map;
    }, {}));

  // Replace any activations with externalIds...
  return activations.map((activation) => {
    // This does not need to be merged...
    if (!activation.externalId) return activation;
    // Go through all the external activations and find the one we're replacing...
    const externalActivation = externalActivationsMap[activation.externalId];
    // If external activation does not exist or not supported, remove it
    if (!externalActivation) return null;

    return format(externalActivation, activation);

  }).filter(i => !!i);
}

/**
 * 
 * @param {*} rawActivation 
 * @param {*} activationRef reference to activation with instance data  
 * @param {*} source 
 * @returns 
 */
function format(rawActivation, activationRef, source) {
  const sanitized = sanitizeEntity(rawActivation, { model: strapi.models.activations });
  const version = (sanitized.data && sanitized.data.version) || sanitized.version;
  // Existing data takes presidence...
  return merge({}, sanitized.data, activationRef, {
    meta: {
      // make sure previewImage is populated to get this right
      icon: get(sanitized, 'data.icon') || get(sanitized, 'previewImage.file.formats.thumbnail.url'), 
      // TODO: do we need this?
      data: JSON.parse(JSON.stringify(sanitized)),
      source: source || 'activation'
    },
    ...(version ? { version } : {}), // FIXME remove legacy support
    template: sanitized.template,
    id: sanitized.id,
    _populated: true
  });
}

module.exports = {
  populate,
  filterBySupported,
  format
};
