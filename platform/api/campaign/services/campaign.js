'use strict';

/**
 * Read the documentation (https://strapi.io/documentation/v3.x/concepts/services.html#core-services)
 * to customize this service
 */
const qs = require('qs');

const getActivePredicates = (now) => [
  { 'active_eq': true },
  { _or: [{ 'dateStart_lte': now }, {'dateStart_null': true }] },
  { _or: [{ 'dateEnd_gte': now }, {'dateEnd_null': true }] },
]

/**
 * Find active campaigns for user visits
 * @param {*} param0 
 * @param {*} populate 
 * @returns 
 */
function findActiveCampaigns({urlDomain, keywords, distributionId}, populate) {
  const predicates = [];
  
  // if domain is not specified then only match campaigns where targetDomains is null
  const domainNullPredicate = { 'targetUrlDomains_null': true };
  predicates.push(urlDomain ? { _or: [ domainNullPredicate, { 'targetUrlDomains_contains': `"${urlDomain}"` }]} : domainNullPredicate);

  const keywordNullPredicate = { 'targetKeywords_null' : true };

  // if keywords are empty then only match campaigns where targetKeyword is null
  if(keywords && keywords.length > 0) {
    const keywordPredicates = keywords.map(k => ({ 'targetKeywords_contains': `"${k}"` }));
    predicates.push( { _or: [ keywordNullPredicate, { _or:  keywordPredicates } ] } );
  } else {
    predicates.push(keywordNullPredicate);
  }

  // if distributionId is empty then only match campaigns where targetDistribution is null
  const distributionNullPredicate = { 'targetDistributions_null' : true }
  predicates.push( distributionId ? { _or: [ distributionNullPredicate,  { 'targetDistributions': distributionId } ] } : distributionNullPredicate );
  
  // At least one of target conditions is not null
  predicates.push({
    _or: [
      { 'targetUrlDomains_null': false },
      { 'targetDistributions_null': false },
      { 'targetKeywords_null': false }
    ]
  })

  const query = qs.parse({_where: [
    ...predicates,
    ...getActivePredicates(new Date()),
    { 'remainingPreviews_gt': 0 },
    { 'remainingViews_gt': 0 },
    { 'remainingActions_gt': 0 }
  ],
  _sort: 'priority:desc'
  });
  return strapi.services.campaign.find(query, populate);
}

/**
 * Find active campaigns by ids.
 * NOTE: Does not check counters
 * @param {*} ids 
 * @param {*} populate 
 * @returns 
 */
function findActiveCampaignsByIds(ids, populate) {
  const query = qs.parse({_where: [
    ...getActivePredicates(new Date()),
    { 'id_in': ids}
  ]});
  return strapi.services.campaign.find(query, populate);
}

/**
 * Finds campaigns whose counter is 0 and deactivates
 * @param {*} ids 
 */
async function deactivateCompletedCampaigns(ids) {
  const query = qs.parse({_where: [
    { 'active_eq': true },
    { 'id_in': ids },
    { _or: [
      { 'remainingPreviews_lte': 0 },
      { 'remainingViews_lte': 0 },
      { 'remainingActions_lte': 0 }
    ]}
  ]});
  const campaigns = await strapi.services.campaign.find(query, [])
  for (const campaign of campaigns) {
    await strapi.services.campaign.update({id: campaign.id}, { active: false })
  }
}

/**
 * Finds active campaigns and computes activations to be injected
 * @param {*} param0 
 * @param {*} param1 
 * @returns 
 */
async function findActivationsByActiveCampaign ({urlDomain, keywords, distributionId}, { populate, filterActivationsBy = () => true, sourceVersion}) {

  const campaigns = await strapi.services.campaign.findActiveCampaigns({urlDomain, keywords, distributionId}, populate);
  
  // Group campaigns by activations into {activationId: {activation, campaigns}} format for later computation
  const activationCampaignMap = campaigns.filter(campaign => !!campaign.activations)
    .map(campaign => {
      // remove unapplicable campaign criteria
      campaign.criteria = (campaign.criteria || [])
        .filter(criteria => !criteria.distribution || criteria.distribution === distributionId);
      return campaign;
    })
    .reduce((map, campaign) => {
      strapi.services.activations.filterBySupported(sourceVersion, campaign.activations)
        .filter(filterActivationsBy) // not cool
        .forEach(activation => {
          if (!map.has(activation.id)) {
            map.set(activation.id, { activation, campaigns: [campaign] });
          } else {
            map.get(activation.id).campaigns.push(campaign);
          }
        });
      return map;
    }, new Map());

  // Computes activations
  const formattedActivations = [...activationCampaignMap.values()].map(({ activation, campaigns }) => {
    const campaignIds = campaigns.map(c => c.id);
    if(activation.version < 2) {
      return strapi.services.activations.format(activation, { campaigns: campaignIds }, 'campaign');
    }
    
    const matchedCriteria = campaigns
      .filter(campaign => !!campaign.criteria)
      .map(campaign => campaign.criteria)
      .flat(1)
      .find(criteria => criteria.activation === activation.id);
    
    const instance = matchedCriteria && matchedCriteria.instance || { when: { start: 0, end: 10000 } };
  
    return strapi.services.activations.format(
      activation,
      // if version==2 then assign default instances 0 - 10s 
      { externalId: activation.id, instances: [instance], campaigns: campaignIds },
      'campaign'
    );
  
  });
  return formattedActivations;
}

module.exports = {
  findActiveCampaigns,
  findActiveCampaignsByIds,
  findActivationsByActiveCampaign,
  deactivateCompletedCampaigns
};
