'use strict';

/**
 * Read the documentation (https://strapi.io/documentation/v3.x/concepts/models.html#life-cycle-callbacks)
 * to customize this model
 */


const ANALYTICS_ID_MAP = Object.freeze({
  '30': { field: 'remainingPreviews' }, // activationDisplay,
  '31': { field: 'remainingViews' },//activationTouch,
  '32': { field: 'remainingActions' }//activationAction
})

const { sanitizeEntity } = require('strapi-utils');
module.exports = {
  lifecycles: {
    // Called after an entry is sucessfully created
    async afterCreate(data) {
      
      // Update campaign counter if campaign exists
      if(!data.campaigns || data.campaigns.length === 0) return;
      const eventType = ANALYTICS_ID_MAP[`${data.e}`]
      if(!eventType) return
      // decrement counter
      // WARN: this will only work when strapi uses bookshelf
      await strapi
            .query("campaign").model
            .query((qb) => {
              qb.whereIn("id", data.campaigns);
              qb.decrement(eventType.field, 1);
            })
        .fetch();
      // deactivate if counter is 0
      await strapi.services.campaign.deactivateCompletedCampaigns(data.campaigns)
    },
  },
};
