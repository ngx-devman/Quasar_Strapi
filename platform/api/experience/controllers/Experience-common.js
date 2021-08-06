
module.exports = {
  timer() {
    return {
      _startTime: null,
      _endTime: null,
      start() {
        this._startTime = new Date()
      },
      end() {
        this._endTime = new Date()
        var timeDiff = this._endTime - this._startTime
        return timeDiff
      }  
    }
  }
}
