import { loadJS, loadCSS } from "./load";
import debug from "./debug";
import handleIOSFullscreen from "./handleIOSFullscreen";

//? Handle postmessage events
/**
 * 
 * @param {Event} Event 
 * @param {HTMLIFrameElement} iframe
 */
const handlePostMessages = (e, iframe) => {
  //* Only process events coming from same origin
  if (e.origin !== window.location.origin) return false;
  debug("Handeling Event", e);
  const data = e && e.data ? e.data : {};

  if (iframe && data && data.value && iframe.src === data.value.src) {
    debug({
      enbedded: `iframeID: ${iframe.id}`,
      data,
    });
  }

  if (data && data.context === "SourceDigital") {
    switch (data.message) {
      case "fullscreen":
        data.isIOS && handleIOSFullscreen(iframe, data);
        break;
      case "loadJS":
        data.src
          ? loadJS(data.src, iframe.id)
          : debug("Failed to load JS file without src");
        break;
      case "loadCSS":
        data.src
          ? loadCSS(data.src)
          : debug("Failed to load CSS file without src");
        break;
      default:
        debug(`${data.message} is not supported!`);
    }
  }
};

export default handlePostMessages;
