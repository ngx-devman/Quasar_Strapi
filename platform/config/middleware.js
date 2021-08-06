require('strapi/lib/core/')
module.exports = {
  load: {
    order: ['basicAuth']
  },
  settings: {
    basicAuth: {
      enabled: true
    }
  }
}