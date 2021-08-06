module.exports = {
  // Use this with caution. Currently intented to be used by IAM(Keycloak) only. 
  // Just use CurrentUser.changePass for most scenarios.
  async updatePasswordByServiceAccount(ctx) {
    if(!ctx.request.body.id || !ctx.request.body.password) {
      return ctx.badRequest({message: 'Password is required.'})
    }
    const newPass = await strapi.admin.services.auth.hashPassword(ctx.request.body.password)
     await strapi.query('user', 'users-permissions').update({ id }, { password: newPass })
  },
  logoutFromProvider(ctx) {
    let logoutUrl
    // Currently Strapi does not allow multiple sso provider per user 
    if((ctx.state.user.provider === 'keycloak' || ctx.state.user.provider === 'local') && strapi.config.get('iam.url')) {
      logoutUrl = strapi.config.get('iam.url') + '/protocol/openid-connect/logout?redirect_uri=' + encodeURIComponent(ctx.query.redirect_uri)
    } else {
      logoutUrl = ctx.query.redirect_uri
    }
  return { logoutUrl }
  }
}