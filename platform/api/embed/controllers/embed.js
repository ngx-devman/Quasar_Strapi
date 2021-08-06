const get = require('lodash/get');

module.exports = {
  domo: async (ctx) => {
    const userAnalyticsFeature = get(ctx.state.user, 'features.analytics', {});
    if(userAnalyticsFeature.level !== 'advanced') return ctx.forbidden();
    const filters = get(userAnalyticsFeature, 'domo.filters');
    if(!filters) {
      throw new Error(`domo.filters is not configured for the user ${ctx.state.user.id}`);
    }
    const embedId = userAnalyticsFeature.id;
    const type = get(userAnalyticsFeature, 'domo.type');
    const embedToken = await strapi.services.domo.getEmbedToken({ embedId, filters, type });
    return { token: embedToken, url: strapi.services.domo.getEmbedUrl(embedId, type) };
  }
};
