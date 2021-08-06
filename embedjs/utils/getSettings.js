import parameters from "./getParameters";
import logs from "./debug";

//? Gets optional embed.js settings from the url
/**
 * 
 * @param {String} url 
 */

const getSettings = (url) => {
  logs("Parsing settings ...");

  const server = parameters("server", url);
  const port = parameters("port", url) ? `:${parameters("port", url)}` : "";
  const tls = parameters("insecure", url) === "true" ? "" : "s";
  const folder = parameters("folder", url);
  const attribute = parameters("attribute", url);
  const stylePrefix = parameters("stylePrefix", url) || "SourceDigital";
  const namespace = parameters("attribute", url)
    ? parameters("attribute", url).split("-")[2]
    : "experience";
  const instant = parameters("instant", url) === "true" ? true : false;
  const debug = parameters("debug", url) === "true" ? true : false;
  const debugColor = parameters("debugColor", url)
    ? `#${parameters("debugColor", url)}`
    : "red";
  const noMinimum = parameters("noMinimum", url) === "true" ? true : false;
  const hidden = parameters("hidden", url) === "true" ? true : false;
  const height = parseInt(parameters("height", url)) || 0;
  const width = parseInt(parameters("width", url)) || 0;

  const settings = {
    url: `http${tls}://${server}${port}/${folder}/`,
    attribute,
    stylePrefix,
    namespace,
    instant,
    debug,
    debugColor,
    noMinimum,
    hidden,
    height,
    width
  };

  //* if noMinimum is not present, force height and width to not be lower than 480x270
  if (!settings.noMinimum) {
    if (settings.width < 480) settings.width = 480;
    if (settings.height < 270) settings.height = 270;
  }
  return settings;
};

export default getSettings;
