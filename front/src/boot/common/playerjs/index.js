import setupReceiver from './receiver'
import setupSender from './sender'

export default (dependencies) => {
  const { Vue } = dependencies
  Vue.prototype.$playerjs = {
    receiver: setupReceiver(dependencies),
    sender: setupSender(dependencies)
  }
}
