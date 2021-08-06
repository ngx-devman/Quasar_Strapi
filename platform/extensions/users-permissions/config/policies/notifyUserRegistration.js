
let policy
if(!process.env.USER_NOTIFICATION_API) {
  console.warn('[WARN] User notification URL is not configured') 
  policy = async(ctx, next) => {
    await next();
  }
}else { // enable this policy only when api is configured.
  const { sanitizeEntity } = require('strapi-utils');
  const axios = require('axios')
  policy = async (ctx, next) => {
    const { confirmation: confirmationToken } = ctx.query;
    const { user: userService } = strapi.plugins['users-permissions'].services;
    if (!confirmationToken) {
      return ctx.badRequest('token.invalid');
    }
    const targetUser = await userService.fetch({ confirmationToken }, []);
    await next();
    if(targetUser) {
      const refreshedUser = await userService.fetch({ id: targetUser.id }, []);
      const sanitizedData = sanitizeEntity(refreshedUser, { 
        model: strapi.query('user', 'users-permissions').model
      })
      const payload = {
        event: 'user.confirmed',
        created_at: refreshedUser.created_at,
        updated_at: refreshedUser.updated_at,
        model: 'users-permissions.User',
        entry: sanitizedData // sanitized userObject
      }
      try {
        await axios.post(process.env.USER_NOTIFICATION_API, payload)
      }
      catch (err) {
        console.error('Failed to post to user notification api', err && err.response ? err.response.data : '')
      }
    }
  }
}

module.exports = policy