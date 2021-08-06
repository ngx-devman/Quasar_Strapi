const { permissions: permissionData, data } = require('./bootstrap-data')

module.exports = {
  permissions: {
    data: permissionData
  },
  contentManager: {
    data
  }
}