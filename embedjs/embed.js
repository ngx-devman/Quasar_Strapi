import debug, { warn, setDebug } from "./utils/debug";
import getSettings from "./utils/getSettings";
import experience from "./utils/experience";
/**
 * 
 * @param {String} url 
 */
export const init = (url) => {
  //? Create the SourceDigitalEnbeds object to help developers see into what's going on within their page...
  if (!window.SourceDigitalEmbeds) {
    window.SourceDigitalEmbeds = {};
  } else
    warn("Warning: You have included SourceSync on your page more than once!");

  //? Pull settings from the url
  let namespace = {
    settings: getSettings(url),
    distributions: [],
  };
  window.SourceDigitalEmbeds[namespace.settings.namespace] = namespace;

  //? If debug is not available hide all logs
  if (namespace.settings.debug) setDebug(false);
  const message = "SourceSync.io is running on your page!"
  debug(message);

  //? Handle when content finishes loading...
  if (namespace.settings.instance) experience(namespace);
  else
    document.addEventListener("DOMContentLoaded", () => {
      experience(namespace);
    });

  return { settings: namespace.settings, message };
};

export default init;
