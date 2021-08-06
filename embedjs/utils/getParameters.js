//? Gets the name of script in order to get parameters
const _scriptName = () => {
  const error = new Error();
  const lastStackFrameRegex = new RegExp(/.+\/(.*?):\d+(:\d+)*$/);
  const currentStackFrameRegex = new RegExp(
    /getScriptName \(.+\/(.*):\d+:\d+\)/
  );

  let source;

  if (
    (source = lastStackFrameRegex.exec(error.stack.trim()) && source[1] !== "")
  )
    return source[1];
  else if ((source = currentStackFrameRegex.exec(error.stack.trim())))
    return source[1];
  else if (error.fileName !== undefined) return error.fileName;
};

//? Gets parameters from the script url
/**
 *
 * @name String
 * @url String
 */
const parameters = (name, url) => {
  if (!url) url = _scriptName();
  //eslint-disable-next-line
  name = name.replace(/[\[\]]/g, "\\$&");

  if (name === 'server') return url.split('/')[2].split(':')[0]
  if (name === 'port') return url.split('/')[2].split(':')[1]
  if (name === 'folder') return url.split('/')[3]

  const regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)");
  const results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return "";

  return decodeURIComponent(results[2].replace(/\+/g, " "));
};

export default parameters;
