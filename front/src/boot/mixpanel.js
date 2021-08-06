import Vue from 'vue'
import mixpanel from 'mixpanel-browser'

mixpanel.init('141f9316f5e6d62420451c89299886d4')

Vue.prototype.$mixpanel = mixpanel
