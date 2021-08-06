import get from 'lodash.get'
// Returns the time in MS since the experience started, media playing or not
const startTime = new Date()
export function counter (state) {
  return new Date() - startTime
}
export function getUserInfo (state) {
  return state.app
}
export function getUserContentActivation (state) {
  if (!state.app.user.activations) return null
  return !!state.app.user.activations.length && state.app.user.activations.filter(a => {
    return a.settings.type === 'content'
  })[0]
}
export function getUserContent (state) {
  return state.app.user.content
}

export function getExperienceToken (state) {
  return state.app.session.experienceToken
}

export function sourceVersion (state) {
  return get(state.app.settings, 'sourceCode.version')
}

export function getUTMParams (state) {
  return state.app.utmParams
}
