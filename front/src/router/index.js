import Vue from 'vue'
import VueRouter from 'vue-router'
import 'plyr/dist/plyr.css'
import VuePlyr from 'components/VuePlyr'
import * as VueGoogleMaps from 'vue2-google-maps'

import routes from './routes'

Vue.use(VueRouter)
Vue.component(VuePlyr.name, VuePlyr)
Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyC4Gr2t_BrfWas1KONAK5uwf9kGSATCT-A',
    libraries: 'places'
  },
  installComponents: true
})

/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation
 */

export default function (/* { store, ssrContext } */) {
  const Router = new VueRouter({
    scrollBehavior: () => ({ x: 0, y: 0 }),
    routes,

    // Leave these as is and change from quasar.conf.js instead!
    // quasar.conf.js -> build -> vueRouterMode
    // quasar.conf.js -> build -> publicPath
    mode: process.env.VUE_ROUTER_MODE,
    base: process.env.VUE_ROUTER_BASE
  })
  return Router
}
