import debug from "./debug";

//? load JS File
/**
 * 
 * @param {String} url 
 * @param {Number} id 
 */
export const loadJS = (url, id) => {
  const script = document.createElement("script");
  script.src = url;
  script.setAttribute("distribution", id);
  document.body.appendChild(script);
};

//? load CSS file
/**
 * 
 * @param {String} url 
 */
export const loadCSS = (url) => {
  const link = document.createElement("link");
  link.href = url;
  link.type = "text/css";
  link.rel = "stylesheet";
  document.getElementsByTagName("head")[0].appendChild(link);
};

//? load function
/**
 * 
 * @param {String} fileType [CSS, JS]
 * @param {Object} data { url: String, id: Number }
 */
const load = (fileType, data) => {
  switch (fileType) {
    case "CSS":
      loadCSS(data.url);
      break;
    case "JS":
      loadJS(data.url, data.id);
      break;
    default:
      debug("Filetype is not supported!");
  }
};

export default load;
