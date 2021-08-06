'use strict';

/**
 * This middleware puts basicAuth policy in front if it exists so it gets executed first
 */

// Public node modules.
const _ = require('lodash');

const BASIC_AUTH_NAME = 'global::basicAuth'

module.exports = strapi => {
  return {
    initialize() {

      _.forEach(strapi.config.routes, value => {
        reorderPolicies(value);
      });

      if (strapi.plugins) {
        _.forEach(strapi.plugins, plugin => {
          _.forEach(plugin.config.routes, value => {
            reorderPolicies(value);
          });
        });
      }
    },
  };
};

function reorderPolicies(value) {
  const policies = _.get(value.config, 'policies')
  if (policies && policies.includes(BASIC_AUTH_NAME)) {
    value.config.policies = [BASIC_AUTH_NAME, ...policies.filter(i => i != BASIC_AUTH_NAME)]
  }
}

