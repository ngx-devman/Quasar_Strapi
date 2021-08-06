module.exports = (ctx, next) => {
  const role = ctx.state.user.role;
  if(!role.type.startsWith('serviceaccount-')) {
    return ctx.badRequest(
      null,
      formatError({
        id: 'Auth.form.error.invalid',
        message: 'This account does not support basic auth.',
      })
    );
  }
  return next();
}