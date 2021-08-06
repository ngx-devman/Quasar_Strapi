'use strict';

const { sanitizeEntity } = require('strapi-utils');
const _ = require('lodash');

const packageJSON = require('../../../../front/package.json');
const defaults = require('../common/defaults.json');
const plugins = require('../common/plugins');
const experienceDynamic = require('../controllers/Experience-dynamic');
const getCookie = (cookies, cookieName) => {
  let value = '; ' + cookies;
  let parts = value.split('; ' + cookieName + '=');
  if (parts.length == 2) return parts.pop().split(';').shift();
};

const merge = (...objects) => {
  const stack = [];
  return _.mergeWith(
    ...objects,
    (targetVal, sourceVal, key, target, source) => {
      var path;
      // eslint-disable-next-line no-constant-condition
      while (true) {
        if (!stack.length) stack.push({ source, path: [] });
        const prev = stack[stack.length - 1];
        if (source === prev.source) {
          path = prev.path.concat(key);
          stack.push({ source: sourceVal, path });
          break;
        }
        stack.pop();
      }
      // here path is an array of the keys (in nesting order) pointing to sourceVal
      // console.log('CUST', path)
      if (_.isArray(targetVal)) {
        return targetVal.concat(sourceVal);
      }
    }
  );
};

// Wraps resource acquisition for DRY...
const getResource = async (id, type, model = strapi.models[type]) => {
  // Handle getting passed empty objects from get function (production/property/org/domain #1 must exist!)...
  if (id.constructor === Object) id = 1;
  let query = { id };
  let defaultQuery = { slug: 'default' };
  if (type === 'distribution') {
    // strapi.log.debug('distribution ID', id, Number.isInteger(parseInt(id)))
    if (!Number.isInteger(parseInt(id))) {
      query = { slug: id };
    }
  }
  // log ('Getting', type, id)
  let result;
  result = await strapi.query(type).findOne(query);
  if (!result) {
    if (type === 'distribution' && query.slug) {
      result = await experienceDynamic(query.slug);
    }
    if (!result) {
      result = await strapi.query(type).findOne(defaultQuery);
      if (!result)
        console.error(
          '*** ERROR - Resource not found AND default doesnt exist!'
        );
    }
  }

  return {
    entity: sanitizeEntity(result, { model }),
    raw: result
  }
};
// Loads user data...
const loadUser = async (ctx) => {
  if (ctx.state.user) {
    strapi.log.info('User already authorized', { user: ctx.state.user.id });
    return await strapi
      .query('user', 'users-permissions')
      .findOne({ id: ctx.state.user.id });
  }

  const cookies = ctx.request.header.cookie;
  const JWT = getCookie(cookies, 'jwt');
  let user = {};
  // If the user exists...
  if (JWT) {
    try {
      const unpackedJWT = await strapi.plugins[
        'users-permissions'
      ].services.jwt.verify(JWT);
      strapi.log.debug('Unpacked JWT', unpackedJWT);
      user = await strapi
        .query('user', 'users-permissions')
        .findOne({ id: unpackedJWT.id });
      strapi.log.info('Got user from Cookie', { user: user.id });
    } catch (e) {
      strapi.log.warn('Invalid JWT', e);
      return user;
    }
  }
  return user;
};

// Builds the dynamic path where
const dynamicPathFunction = (sourceCode, which) => {
  if (which === 'sourceCode') return `${plugins.source(sourceCode)}/`;

  return `${plugins.sourceApi(sourceCode)}/`;
};

const get = (obj, path, def) => {
  const val = _.get(obj, path, {});
  if (val === null || val === undefined) return def || {};
  return val;
};


function mergeKeywordsFromLayers(baseKeywords, layers) {
  const keywordSet = layers
    .filter(e => !!e && Array.isArray(e.keywords))
    .map(e => e.keywords)
    .reduce((set, keywords) => { 
      keywords.forEach(key => set.add(key)); 
      return set;
    }, new Set(baseKeywords));
  return [...keywordSet];
}


/**
 * Merges selected field from list of objects in to single object.
 * @param {*} field 
 * @param {*} args 
 * @returns 
 */
function mergeProperty(field, args) {
  const fields = args.map(i=> get(i, field)).filter(i => !!i && typeof i === 'object')
  return merge({}, ...fields)
}

const data = async (ctx, fromSelf = false) => {
  const dataEndpoint = fromSelf ? 'data' : '';
  const slug = ctx.params.id;
  const activationId = ctx.params.activation;
  const user = await loadUser(ctx);
  const { distribution, production, property, organization, domain, hiddenProperties } = await fetchConfigLayers(slug);

  // Get rid of excess data...
  distribution.production = production.id;
  production.property = property.id;
  property.organization = organization.id;
  organization.domain = domain.id;



  // Mix the settings...
  // let settings = get(organization, 'domain.settings')
  // settings = _.mergeWith(settings, get(organization, 'settings'), customizer)
  // Log what's happening...
  strapi.log.debug(
    `GET /experience/${dataEndpoint}/${slug}${
      activationId ? '/' + activationId : ''
    }`,
    {
      domain: domain.id,
      organization: organization.id,
      property: property.id,
      production: production.id,
      distribution: distribution.id,
      activation: activationId,
    }
  );
  // Apply it to the greater config object...
  let config = {
    // TODO: Get rid of the data section (currently need "distribution" in UI)...
    data: { distribution, production, property, organization, domain },
    originalSettings: {
      domain: domain.settings,
      organization: organization.settings,
      property: property.settings,
      production: production.settings,
      distribution: distribution.settings,
    },
    settings: merge(
      {},
      domain.settings,
      organization.settings,
      property.settings,
      production.settings,
      distribution.settings
    ),
    // content pulls from the distribution first, otherwise production...
    content: {
      cover:
        _.get(distribution, 'coverImage.file') || 
        _.get(distribution, 'cover') || // NOTE: distribution.cover is deprecated
        _.get(distribution, 'production.cover') ||
        undefined,
      title:
        _.get(distribution, 'name') ||
        _.get(distribution, 'production.name') ||
        defaults.ogMeta.title,
      type:
        _.get(distribution, 'type') ||
        _.get(distribution, 'production.type') ||
        defaults.ogMeta.type,
      media:
        _.get(distribution, 'media') ||
        _.get(distribution, 'production.media') ||
        undefined,
    },
    session: {},
  };

  /*
  * ACTIVATIONS
  */

  // Mix and label all the activations...
  let activations = [];
  // Push all distribution events...
  if (distribution.data) {
    distribution.data.forEach((activation) => {
      if (!activation.meta) activation.meta = {};
      activation.meta.source = 'distribution';
      activations.push(activation);
    });
  }
  // Push all produciton events...
  if (production.data) {
    distribution.production.data.forEach((activation) => {
      if (!activation.meta) activation.meta = {};
      activation.meta.source = 'production';
      activations.push(activation);
    });
  }

  const sourceVersion = _.get(
    config,
    'settings.sourceCode.version',
    defaults.version
  );

  activations = await strapi.services.activations.populate(activations, {
    sourceVersion,
  });

  /*
  * ACTIVATIONS by CAMPAIGN
  */


  const existingActivationSet = activations.reduce((set, activation) => {
    set.add(activation.id);
    return set;
  }, new Set());

  // fetch campaign by keyword

  // retrieve external keywords
  let externalKeywords
  if(hiddenProperties.externalKeywords) {
    try {
      externalKeywords = await strapi.services.externalkeywords.fetchKeywords({distribution, slug}, hiddenProperties.externalKeywords)
    } catch (e){
      console.error('Fatal error occurred while retrieving external keywords.', e && e.message)
    }
  }

  const keywords = mergeKeywordsFromLayers(externalKeywords, [distribution, production, property, domain]);


  const urlDomain =  ctx.query['utm_source'];
  // find campaign
  const activationsByCampaigns = await strapi.services.campaign.findActivationsByActiveCampaign(
    {urlDomain, keywords, distributionId: distribution.id},
    {
      sourceVersion,
      filterActivationsBy: activation => !existingActivationSet.has(activation.id) // remove duplicate activations
    }
  );

  activations.push(...activationsByCampaigns);
  // Set events...
  config.events = activations;

  // Make sure some ogMeta exists...

  // If activationId exists, use it's ogMeta instead...
  let ogActivation = {};
  if (activationId) {
    // Find the activationId in the list of activations...
    activations.forEach((activation) => {
      if (activation.id === activationId) ogActivation = activation;
    });
    config.settings.ogMeta = {
      title:
        _.get(ogActivation, 'ogMeta.title') ||
        _.get(ogActivation, 'name') ||
        _.get(ogActivation, 'title') ||
        _.get(ogActivation, 'dataObject.name') ||
        _.get(config, 'settings.ogMeta.title') ||
        config.content.title,
      type:
        _.get(ogActivation, 'ogMeta.type') ||
        _.get(config, 'settings.ogMeta.type') ||
        config.content.type,
      image:
        _.get(ogActivation, 'ogMeta.image') ||
        _.get(ogActivation, 'image') ||
        _.get(ogActivation, 'dataObject.mainImageUrl') ||
        _.get(config, 'settings.ogMeta.image') ||
        _.get(config, 'content.cover.url') ||
        '',
      url:
        _.get(ogActivation, 'ogMeta.url') ||
        _.get(config, 'settings.ogMeta.url') ||
        '',
      description:
        _.get(ogActivation, 'ogMeta.description') ||
        _.get(ogActivation, 'description') ||
        _.get(ogActivation, 'dataObject.data.description') ||
        _.get(config, 'settings.ogMeta.description') ||
        '',
      siteName:
        _.get(ogActivation, 'ogMeta.siteName') ||
        _.get(config, 'settings.ogMeta.siteName') ||
        '',
    };
  } else {
    config.settings.ogMeta = {
      title: _.get(config, 'settings.ogMeta.title') || config.content.title,
      type: _.get(config, 'settings.ogMeta.type') || config.content.type,
      image:
        _.get(config, 'settings.ogMeta.image') ||
        _.get(config, 'content.cover.url') ||
        '',
      url: _.get(config, 'settings.ogMeta.url') || '',
      description: _.get(config, 'settings.ogMeta.description') || '',
      siteName: _.get(config, 'settings.ogMeta.siteName') || '',
    };
  }

  // Create a new build section...
  const build = {
    version: packageJSON.version,
    target: config.settings.sourceCodeApi.environment,
  };

  // Get ancillary data...
  // const ancillary = await strapi00.controllers.ancillary.find({ params: { id: distribution.id }, request: { body: { settings } } })

  // Mix the ancillary settings...
  // mixit(settings, ancillary.data.settings)

  // Push all ancilarry events...
  /*
  ancillary.data.data.forEach(item => {
      if (item) {
          item.source = 'ancillary'
          events.push(item)
      }
  })
  */
  // Handle billing...
  // const billingEntry = {
  //   distribution: distribution.id,
  //   activation: _.get(ogActivation, 'meta.data.id'),
  //   audience: _.get(user, 'id'),
  //   session: 'test',
  //   type: 'CPM'
  // }
  // const entry = await strapi.query('billing').create(billingEntry)

  // Remove any user items that shouldn't show...

  config.user = sanitizeEntity(user, {
    model: strapi.plugins['users-permissions'].models.user,
  });

  return {
    build,
    config,
    keywords,
    pathFunction: dynamicPathFunction(config.settings.sourceCode, 'sourceCode'),
    sourceCodeApi: dynamicPathFunction(
      config.settings.sourceCodeApi,
      'sourceCodeApi'
    ),
    distribution: {
      id: distribution.id,
    },
    experience: {
      id: distribution.id,
      embedded: false,
      embedId: null,
      debug: false,
    },
  };
};
module.exports = {
  data,
};

async function fetchConfigLayers(slug) {
  const { entity: distribution, raw: rawDistribution }  = await getResource(slug, 'distribution');
  // Note breaks when there's no production/property/organization/domain
  const { entity: production, raw: rawProduction }  = await getResource(
    get(distribution, 'production.id'),
    'production'
  );
  const { entity: property, raw: rawProperty }  = await getResource(
    get(production, 'property.id'),
    'property'
  );
  const { entity: organization, raw: rawOrganization }  = await getResource(
    get(property, 'organization.id'),
    'organizations'
  );
  const { entity: domain, raw: rawDomain }  = await getResource(get(organization, 'domain.id'), 'domain');

  const hiddenProperties = mergeProperty('hidden', [rawDistribution, rawProduction, rawProperty, rawOrganization, rawDomain])
  return { distribution, production, property, organization, domain, hiddenProperties };
}
