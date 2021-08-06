

module.exports = async (ctx, next) => {
  if(!ctx.request.body) ctx.badRequest('Body must not be empty.');
  delete ctx.request.body.features;
  await next();
}