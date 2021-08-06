export default {
  // pause video if currently playing, and store video state. play video if stored state is true. Copy of EP showDetails
  pause () {
    if (this.$common.media.ref.playing) {
      this.$_pausedByBlock = true
      this.$common.media.ref.pause()
    }
  },
  resume () {
    if (this.$_pausedByBlock) {
      this.$_pausedByBlock = false
      this.$common.media.ref.play()
    }
  }
}
