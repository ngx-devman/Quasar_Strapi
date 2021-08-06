const Tpl = require('nano-var-template');
const pathCompiler = Tpl({ start: '{', end: '}'})
const MotorTrendApi = require('../../../common/motortrend-api')

// nano-var-template throws string instead of error object which breaks Strapi error handler
function compileUrl(url, pathParams) {
  try {
    return pathCompiler(url, pathParams)
  } catch (err) {
    throw (typeof err === 'string') ? new Error(err) : err
  }
}

async function fetchKeywordsFromMotorTrend({method, url, pathParams = {}, queryParams, secretKey}) {
  if(!url) throw new Error('url is required.')
  const urlObj = new URL(compileUrl(url, pathParams))
  if(queryParams) urlObj.search = new URLSearchParams(queryParams)
  const distribution = await MotorTrendApi.request({method, url: urlObj.toString()}, { secretKey })
  if(!distribution) return null
  return distribution.keywords
}

async function fetchKeywords({distribution, slug}, externalKeywordsConfig) {
  switch(externalKeywordsConfig.type) {
    case 'motortrend': {
      const payload = externalKeywordsConfig.payload
      // FIXME Come up with better way for dynamic slug handling 
      if(distribution && distribution.slug === 'default' && (!slug || !slug.startsWith('motortrend-'))) {
        console.debug('To use motortrend api with dynamic slug, the slug must start with "motortrend-"')
        return
      }
      const _slug = distribution && distribution.slug !== 'default' ? distribution.slug : slug
      const feedId = MotorTrendApi.getFeedIdFromSlug(_slug)
      payload.pathParams = Object.assign(feedId ? { feedId } : {}, payload.pathParams) 
      return await fetchKeywordsFromMotorTrend(payload)
    }
    default: {
      console.warn(`[WARN] this type ${externalKeywordsConfig.type} is not supported by extenalKeywords service`)
    }
  }
  return null
}

module.exports = {
  fetchKeywordsFromMotorTrend,
  fetchKeywords
}