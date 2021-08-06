'use strict';

/**
 * Ancillary data requires the activated sandbox
 *
 */

/**
 * Read the documentation (https://strapi.io/documentation/3.0.0-beta.x/concepts/controllers.html#core-controllers)
 * to customize this controller
 */

const pct = (part, total) => ((100 * part) / total) || 0

module.exports = {
  // Protected, GET/:id: Get the distribution analytics...
  pulse: async(ctx) => {
    const distribution = ctx.params.id
    let results = await strapi.query("pulse").find( { distribution } )

    // Build up some statistics...
    const data = {
      traffic: {
        sessions: 0,
        users: {
          seen: [],
          unique: 0,
          mobile: {
            total: 0,
            ios: 0,
            android: 0
          },
          desktop: {
            total: 0,
            win: 0,
            mac: 0
          }
        }
      }
    }
    // Loop through the results and compute things...
    results.forEach(result => {
      // Process the agent...
      if (result.agent && result.agent.payload) {
        const agent = result.agent.payload
        if (agent.mobile) {
          // Mobile...
          data.traffic.users.mobile.total++
          if (agent.android) {
            data.traffic.users.mobile.android++
          } else if (agent.ios) {
            data.traffic.users.mobile.ios++
          }
        } else {
          // Desktop...
          data.traffic.users.desktop.total++
          if (agent.win) {
            data.traffic.users.desktop.win++
          } else if (agent.mac) {
            data.traffic.users.desktop.mac++
          }
        }
      }
      data.traffic.sessions++
      if (!data.traffic.users.seen.includes(result.user.id)) data.traffic.users.seen.push(result.user.id)

    })
    return {
        success: true,
        data: {
          raw: data,
          percentages: {
            mobile: {
              total: pct(data.traffic.users.mobile.total, data.traffic.sessions),
              ios: pct(data.traffic.users.mobile.ios, data.traffic.users.mobile.total),
              android: pct(data.traffic.users.mobile.android, data.traffic.users.mobile.total)
            },
            desktop: {
              total: pct(data.traffic.users.desktop.total, data.traffic.sessions),
              win: pct(data.traffic.users.desktop.win, data.traffic.users.desktop.total),
              mac: pct(data.traffic.users.desktop.mac, data.traffic.users.desktop.total)
            }
          }
        }
    }
  },
  // Protected, POST: Update the distribution settings...
  config: async(ctx) => {
    let settings = ctx.request.body
    return {
        success: true
    }
  }
};
