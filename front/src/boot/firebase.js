import { app, rtdb } from './firebase/database'
import { rtdbPlugin } from 'vuefire'

export default ({ Vue }) => {
  Vue.use(rtdbPlugin)

  Vue.prototype.$firebase = app
  Vue.prototype.$rtdb = rtdb
}
