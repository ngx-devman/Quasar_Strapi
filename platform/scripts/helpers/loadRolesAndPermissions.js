/**
 * A helper script to load roles and permissions from strapi API and writes to stdout.
 * Recommended to use with commands like pbcopy.
 * NOTE: this only fetches enabled permissions.
 */

// Populate this
const apiUrl = ''
const token = ''

const _ = require('lodash')

const api = require('axios').create({
  baseURL: apiUrl,
  headers: {
    Authorization: `Bearer ${token}`
  }
})


async function load() {


  const { data: { data: { roles } } } = await api.post(`/graphql`, {
    query: `
query {
  roles {
    name
    type
    description
    permissions (where: { enabled: true }) {
      type
      controller
      action
      enabled
      policy
    }
  }
}
` })

  // format...
  roles.forEach(role => {
    const perms = role.permissions
    const permObj = {}
    perms.forEach(({ type, controller, action, enabled, policy }) => _.set(permObj, `${type}.controllers.${controller}.${action}`, { enabled, ...(policy ? { policy } : {}) }))
    role.permissions = permObj
  })
  console.log(JSON.stringify(roles, null, 2))

}

load().catch(e => { console.error(e) })