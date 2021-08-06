
import PlayerjsPlayerBuilder from './utils/player-builder'
import DeepMap from '../../../utils/deep-map'

export default function setupSender (dependencies) {
  const { Vue } = dependencies
  const instanceIdMap = new DeepMap()
  const senderMethods = {
    setDistribution: () => window.SourceDigital.config.data.distribution
  }
  const senderDebug = Vue.prototype.$debug.extend(`$playerjs.sender`)
  return {
    register (instanceId, el) {
      if (!instanceId || !el) throw new Error('"instanceId" and "el" are required.')
      if (instanceIdMap.has(instanceId, el)) {
        console.error('This element is already registered.')
        return
      }
      const player = new PlayerjsPlayerBuilder(el)
      player.on('callMethod', ({ method, value }) => {
        senderDebug('req:callMethod', { instanceId, el }, { method, value })
        if (!senderMethods[method]) {
          console.warn('This method is not supported.', el, method)
          return
        }
        const response = { method, value: senderMethods[method](value) }
        senderDebug('res:callMethod', { instanceId, el }, { method, value }, response)
        player.instance.send(response)
      }).build()
      senderDebug('new playerjs registered.', { instanceId, el })
      instanceIdMap.set(instanceId, el, player)
    },
    unregister (instanceId) {
      const players = instanceIdMap.get(instanceId)
      if (!players) return
      // todo cleanup work?
      [...players.values()].forEach(player => player.removeAllEventListeners())
      senderDebug('playerjs unregistered.', { instanceId, players })
      instanceIdMap.delete(instanceId)
    }
  }
}
