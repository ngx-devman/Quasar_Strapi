let debug = console.log;
export const warn = console.warn;

/**
 * 
 * @bool Boolean 
 */
export const setDebug = (bool) => {
  if (bool) debug = console.log;
  else debug = () => {};
};
export default debug;
