const getConstructor = input => (input !== null && typeof input !== 'undefined' ? input.constructor : null)
const instanceOf = (input, constructor) => Boolean(input && constructor && input instanceof constructor)
const isNullOrUndefined = input => input === null || typeof input === 'undefined'
const isObject = input => getConstructor(input) === Object
const isNumber = input => getConstructor(input) === Number && !Number.isNaN(input)
const isString = input => getConstructor(input) === String
const isArray = input => Array.isArray(input)
const isNodeList = input => instanceOf(input, NodeList)

const isEmpty = input =>
  isNullOrUndefined(input) ||
  ((isString(input) || isArray(input) || isNodeList(input)) && !input.length) ||
  (isObject(input) && !Object.keys(input).length)

export default vttDataString => {
  const processedList = []
  const frames = vttDataString.split(/\r\n\r\n|\n\n|\r\r/)
  frames.forEach(frame => {
    const result = {}
    const lines = frame.split(/\r\n|\n|\r/)
    lines.forEach(line => {
      if (!isNumber(result.startTime)) {
        // The line with start and end times on it is the first line of interest
        const matchTimes = line.match(
          /([0-9]{2})?:?([0-9]{2}):([0-9]{2}).([0-9]{2,3})( ?--> ?)([0-9]{2})?:?([0-9]{2}):([0-9]{2}).([0-9]{2,3})/
        ) // Note that this currently ignores caption formatting directives that are optionally on the end of this line - fine for non-captions VTT
        if (matchTimes) {
          result.startTime =
            Number(matchTimes[1] || 0) * 60 * 60 +
            Number(matchTimes[2]) * 60 +
            Number(matchTimes[3]) +
            Number(`0.${matchTimes[4]}`)
          result.endTime =
            Number(matchTimes[6] || 0) * 60 * 60 +
            Number(matchTimes[7]) * 60 +
            Number(matchTimes[8]) +
            Number(`0.${matchTimes[9]}`)
        }
      } else if (!isEmpty(line.trim()) && isEmpty(result.text)) {
        // If we already have the startTime, then we're definitely up to the text line(s)
        const lineSplit = line.trim().split('#xywh=');
        [result.text] = lineSplit
        // If there's content in lineSplit[1], then we have sprites. If not, then it's just one frame per image
        if (lineSplit[1]) [result.x, result.y, result.w, result.h] = lineSplit[1].split(',')
      }
    })
    if (result.text) processedList.push(result)
  })
  return processedList
}
