import Vue from 'vue'
import Vuex from 'vuex'

import config from './config'
import user from './user'
import events from './events'

Vue.use(Vuex)

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation
 */

export default function (/* { ssrContext } */) {
  const Store = new Vuex.Store({
    modules: {
      config,
      user,
      events
    },
    // enable strict mode (adds overhead!) for dev mode only
    strict: process.env.DEV
  })

  return Store
}
