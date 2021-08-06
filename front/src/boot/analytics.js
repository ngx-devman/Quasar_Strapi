import Vue from 'vue'
/**
 * @param {String} action
 * @param {String} label
 * @param {String} category
 */

export const analytics = (action, label, category = 'Billing', hitType = 'event') => {
  if (!label) return false
  if (window.ga) {
    window.ga('initial.send', {
      hitType,
      eventCategory: category,
      eventAction: action,
      eventLabel: label,
      page: window.location.href
    })
  }
}

/**
 * @param {String} distribution
 * @param {String} slug
 */

export const set = (distribution, slug) => {
  if (window.ga) {
    window.ga('initial.set', distribution, slug)
  }
}

Vue.prototype.$analytics = analytics
Vue.prototype.$setAnalytics = set
