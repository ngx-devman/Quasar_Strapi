/**
 * Helper class for maintaining nested map
 */
export default class DeepMap {
  constructor () {
    this.map = new Map()
  }
  set (key, secondKey, value) {
    if (!this.map.has(key)) this.map.set(key, new Map())
    this.map.get(key).set(secondKey, value)
  }

  get (key, secondKey) {
    if (typeof secondKey === 'undefined') return this.map.get(key)
    return this.map.has(key) ? this.map.get(key).get(secondKey) : null
  }

  has (key, secondKey) {
    if (typeof secondKey === 'undefined') return this.map.has(key)
    return this.map.has(key) && this.map.get(key).has(secondKey)
  }

  delete (key, secondKey) {
    if (typeof secondKey === 'undefined') return this.map.delete(key)
    return this.map.has(key) && this.map.get(key).delete(secondKey)
  }
  clear (key) {
    if (typeof key === 'undefined') return this.map.clear()
    return this.map.has(key) && this.map.get(key).clear()
  }
}
