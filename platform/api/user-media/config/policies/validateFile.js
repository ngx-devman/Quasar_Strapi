const { parseMultipartData} = require('strapi-utils');

const getFileType = mime => {
  if (!mime) return 'file';
  const type = mime.split(/[\s/]+/)[0];

  // check if it is known type
  return fileValidators[type] ? type : 'file';
};

/** 
 * For now this API don't support non-image files but feel free to update this validators when we expand our support. 
*/
const fileValidators = {
  image() {},
  video(ctx) {
    return { error: true, response: ctx.response.unsupportedMediaType('This file format is not supported.') };
  },
  file(ctx) {
    return { error: true, response: ctx.response.unsupportedMediaType('This file format is not supported.') };
  }
};
 

module.exports = async function (ctx, next) {
  if(ctx.is('multipart')) {
    const { files } = parseMultipartData(ctx);
    if(files.file) {
      const file = files.file;
      if(file.size === 0) {
        return ctx.response.badData('The file is empty.'); 
      }
      const type = getFileType(file.type);
      const result = fileValidators[type](ctx, file);
      if(result && result.error) return result.response;
    }
  }
  await next();
};