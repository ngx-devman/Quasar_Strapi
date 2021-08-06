//? Handle iframe fullscreen events for ios
/**
 *
 * @param {HTMLIFrameElement} iframe
 * @data {Object}
 * @settings Object { stylePrefix: String }
 */
const handleIOSFullscreen = (iframe, data, settings) => {
  const { isIOS, value } = data;
  const stylePrefix = settings.stylePrefix;

  if (value === "enter" && isIOS) {
    iframe.classList.remove(`${stylePrefix}_browser`);
    iframe.classList.add(`${stylePrefix}_ios`);
  } else {
    iframe.classList.remove(`${stylePrefix}_ios`);
    iframe.classList.add(`${stylePrefix}_browser`);
  }
  iframe.style = "";
};

export default handleIOSFullscreen;
