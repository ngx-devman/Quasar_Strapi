/* eslint-disable camelcase */
import axios from 'axios'
import Vue from 'vue'
import state from '../../../store/config/state'
import EnvConfig from '../../config'
async function query ({ productionId, timelineId = 'default', customerId }) {
  const config = Vue.prototype.$config
  const url = `${config.gateway}/productions/${productionId}/timelines/${timelineId}/segments?count=10000`
  const { data } = await axios.get(
    url, {
      headers: { 'X-CUSTOMER-ID': customerId }
    })
  return data.items
}
async function queryVideo ({ productionId, customerId }) {
  const config = Vue.prototype.$config
  const { data } = await axios.get(
    `${config.gateway}/productions/${productionId}`, {
      headers: { 'X-CUSTOMER-ID': customerId }
    })
  return data
}
// Returns the subset of timeline items that should be displayed right now...
function visible (timeline, currentTime) {
  return timeline.filter(item => {
    if (item.start < currentTime && item.end > currentTime) return true
    return false
  })
}
// checkout/cart service call
async function callCheckout (dataObj) {
  let url = state.server + 'checkout/cart'
  const { data } = await axios.post(url, dataObj)
  return data
}
/* checkout service call when clicking on shipping method
radio button */
async function callShippingCheckout (dataObj) {
  let url = state.server + 'checkout'
  const { data } = await axios.post(url, dataObj)
  return data
}
// checkout/shipping service call
async function callCheckoutShipping () {
  let url = state.server + 'checkout/shipping'
  const { data } = await axios.post(url)
  return data
}
// checkout/purchase service call
async function callPurchase (dataObj) {
  let url = state.server + 'checkout/purchase'
  const { data } = await axios.post(url, dataObj)
  return data
}
// checkout/paypal service call
async function callCheckoutPaypal (dataObj) {
  let url = state.server + 'checkout/paypal'
  const { data } = await axios.post(url, dataObj)
  return data
}
// stock service call
async function callStock (productId, clientId) {
  let url = state.server + 'stock/' + clientId + '/' + productId + '/'
  const { data } = await axios.get(url)
  return data
}
// pulse service call
/*
async function callPulse (paramObj) {
  console.warn('CALL PULSE CALLED', paramObj)
  const headers = {
    'X-CUSTOMER-ID': paramObj.customerId
  }
  var dataObj = {}
  dataObj.productionId = paramObj.productionId
  dataObj.event = {
    'type': paramObj.typeVal,
    'startTimeMs': paramObj.startTimeMs,
    'durationMs': paramObj.durationMs
  }
  if (typeof paramObj.source !== 'undefined') {
    dataObj.event.source = paramObj.source
  }
  if (typeof paramObj.dataObjectId !== 'undefined') {
    dataObj.event.dataObjectId = paramObj.dataObjectId
  }
  if (typeof paramObj.success !== 'undefined') {
    dataObj.event.success = paramObj.success
  }
  if (typeof paramObj.error !== 'undefined') {
    dataObj.event.error = paramObj.error
  }
  if (typeof paramObj.step !== 'undefined') {
    dataObj.event.step = paramObj.step
  }
  if (typeof paramObj.cart !== 'undefined') {
    dataObj.event.cart = paramObj.cart
  }
  dataObj.context = {
    'userToken': localStorage.getItem('token'),
    'sessionToken': 'session-Fta3l2XcyAqs1G1G39',
    'userAgent': navigator.userAgent,
    'customerId': paramObj.customerId,
    'productionId': paramObj.productionId,
    'timelineId': paramObj.timelineId,
    'currentTimeMs': paramObj.currentTimeMs,
    'fullscreen': false,
    'volume': 1,
    'url': state.server + paramObj.customerId + '/' + paramObj.productionId
  }
  await axios.post(state.server.pulse,
    dataObj,
    {
      headers: headers
    })
}
*/

// user info service call
async function callUserInfo () {
  var token = localStorage.getItem('token')
  const authString = 'Bearer '.concat(token)
  let url = state.server + 'user/info'
  const data = await axios({
    method: 'get',
    url: url,
    headers: { 'Authorization': authString }
  })
  return data
}

// user auth service call
async function callUserAuth (dataObj) {
  let url = state.server + 'user/auth'
  const { data } = await axios.post(url, dataObj)
  return data
}
// user/shipping service call
async function callUserShipping (dataObj) {
  var token = localStorage.getItem('token')
  var headers = {
    headers: { 'Authorization': 'Bearer ' + token }
  }
  let url = state.server + 'user/shipping'
  const { data } = await axios.post(url, dataObj, headers)
  return data
}
// user/billing service call
async function callUserBilling (dataObj) {
  var token = localStorage.getItem('token')
  var headers = {
    headers: { 'Authorization': 'Bearer ' + token }
  }
  let url = state.server + 'user/billing'
  const { data } = await axios.post(url, dataObj, headers)
  return data
}
// user login service call
async function callUserLogin (dataObj) { // new
  let url = state.server + 'auth/local'
  const { data } = await axios.post(url, dataObj)
  return data
}
// google login service call
async function callConnectGoogle () {
  let url = state.server + 'connect/google'
  const { data } = await axios.get(url)
  return data
}
// facebook login service call
async function callConnectFacebook () {
  let url = state.server + 'connect/facebook'
  const { data } = await axios.get(url)
  return data
}

// /auth/local/register service call
async function callUserRegister (dataObj) {
  let url = state.server + 'auth/local/register'
  const { data } = await axios.post(url, dataObj)
  return data
}

// order service call
async function callOrder (dataObj, clientId) {
  let url = state.server + 'orders/' + clientId
  const { data } = await axios.post(url, dataObj)
  return data
}

// update user profile
async function updateUserProfile (dataObj, clientId) {
  const url = state.server + 'user/' + clientId
  const token = localStorage.getItem('token')
  const config = {
    headers: { 'Authorization': 'Bearer ' + token }
  }
  const { data } = await axios.put(url, dataObj, config)
  return data
}

async function getSourceExperienceToken () {
  const url = state.sourceExperienceSession

  const alreadyHasToken = state.app.session.experienceToken
  if (alreadyHasToken) return false
  const { data } = await axios.get(url)
  state.app.session.experienceToken = data.token
  return data
}

async function postSourceExperienceToken (token, body) {
  try {
    if (!token) return false
    const url = state.sourceExperienceConsume
    const config = {
      headers: {
        'Authorization': token
      }
    }
    const { data } = await axios.post(url, body, config)
    return data
  } catch {}
}

async function internalAnalytics (body, {
  ...rest }) {
  const url = state.server + 'analytics'
  const utmParams = Object.fromEntries(new URLSearchParams(window.location.search).entries())
  const { data } = await axios.post(url, {
    ...body,
    utm_source: utmParams.utm_source,
    utm_campaign: utmParams.utm_campaign,
    utm_content: utmParams.utm_content,
    utm_term: utmParams.utm_term,
    utm_medium: utmParams.utm_medium,
    time: String(Date.now()),
    TLD: window.location.host,
    URL: window.location.href,
    env: EnvConfig.target,
    agent: Vue.prototype.$q.platform,
    mobile: !!Vue.prototype.$q.platform.is.mobile,
    query_string: { ...rest }
  })
  return data
}
export default {
  query,
  visible,
  queryVideo,
  callCheckout,
  callShippingCheckout,
  callCheckoutShipping,
  callPurchase,
  callCheckoutPaypal,
  callStock,
  // callPulse,
  callUserInfo,
  callUserShipping,
  callUserBilling,
  callUserAuth,
  callUserLogin,
  callConnectGoogle,
  callConnectFacebook,
  callUserRegister,
  callOrder,
  updateUserProfile,
  getSourceExperienceToken,
  postSourceExperienceToken,
  internalAnalytics
}
