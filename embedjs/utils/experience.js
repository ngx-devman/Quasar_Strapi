import uuid from "./uuid";
import debug from "./debug";
import handlePostMessages from "./handlePostMessages";

//? Find and setup experiences
/**
 * 
 * @param {*} namespace | Object
 */
const experiences = (namespace) => {
  const { settings, distributions } = namespace;
  const attr = settings.attribute;
  debug("Finding experience with available settings", settings);

  document.querySelectorAll(`[${attr}]`).forEach((e) => {
    const domID = uuid();
    const id = e.getAttribute(attr);

    debug(`Embedded ${attr} assigned "${id}" id "${domID}"`);

    distributions.push({ domID, id });
    const eDomID = document.createAttribute(`${attr}-id`);
    eDomID.value = domID;
    e.setAttribute(eDomID);

    const {
      url,
      stylePrefix,
      hidden,
      width,
      height,
      debug,
      debugColor,
    } = settings;

    const debugStyle = debug ? `border: 10px solid ${debugColor}` : "";

    let size =
      width && height ? `min-width:${width}px;min-height:${height}px;` : "";
    if (hidden) size = "width: 0px; height: 0px";

    const iframe = document.createElement("iframe");
    iframe.src = `${url}${id}?embed=true&embedId=${domID}&debug=${debug}`;
    iframe.style = `${size}border:none;${debugStyle}`;

    //* appending styles
    const styles = `
          .${stylePrefix}_browser: { ${size} }
          .${stylePrefix}_ios: {
            position: fixed;
            top: 0; left: 0; right: 0; bottom: 0;
            width: 100%; height: 100%;
            border: none;
            margin: 0; padding: 0;
            overflow: hidden; z-index: 99999
          }
        `;
    const style = document.createElement("style");
    style.innerHTML = styles;
    document.querySelector("head").appendChild(style);

    iframe.classList.add(`${stylePrefix}_browser`);
    iframe.setAttribute("allowFullScreen", "");
    e.appendChild(iframe);

    //* adding global listner to window object for postMessages
    window.addEventListener("message", (event) =>
      handlePostMessages(event, iframe)
    );
  });
};

export default experiences;
