/**
 * implements basicAuth via policy to selected api endpoints
 * Lots of codes are taken from users-permissions (not very cool) so be aware
 **/ 
const _ = require('lodash');

module.exports = async (ctx, next) => {
  return await basicAuth(ctx, next)
}

/**
 * Many parts are derived from: 
 * - platform/node_modules/strapi-plugin-users-permissions/config/policies/permissions.js
 * - platform/node_modules/strapi-plugin-users-permissions/controllers/Auth.js
 * @returns 
 */
const basicAuth = async (ctx, next) => {

  if (ctx.state.user) {
    // request is already authenticated in a different way
    return next();
  }

  if (ctx.request && ctx.request.header && ctx.request.header.authorization) {
   
    let role;

    const params = decodeBasicHeader(ctx);

    const store = await strapi.store({
      environment: '',
      type: 'plugin',
      name: 'users-permissions',
    });
    
    if (!_.get(await store.get({ key: 'grant' }), 'email.enabled')) {
      return ctx.badRequest(null, 'This provider is disabled.');
    }
    
    // The identifier is required.
    if (!params.identifier) {
      return ctx.badRequest(
        null,
        formatError({
          id: 'Auth.form.error.email.provide',
          message: 'Please provide your username or your e-mail.',
        })
      );
    }
    
    // The password is required.
    if (!params.password) {
      return ctx.badRequest(
        null,
        formatError({
          id: 'Auth.form.error.password.provide',
          message: 'Please provide your password.',
        })
      );
    }
    
    const query = {
      provider: 'local',
      username: params.identifier
    };

    query.username = params.identifier;
    
    // Check if the user exists.
    const user = await strapi.query('user', 'users-permissions').findOne(query);
    
    if (!user) {
      return ctx.badRequest(
        null,
        formatError({
          id: 'Auth.form.error.invalid',
          message: 'Identifier or password invalid.',
        })
      );
    }
    
    if (
      _.get(await store.get({ key: 'advanced' }), 'email_confirmation') &&
      user.confirmed !== true
    ) {
      return ctx.badRequest(
        null,
        formatError({
          id: 'Auth.form.error.confirmed',
          message: 'Your account email is not confirmed',
        })
      );
    }
    
    if (user.blocked === true) {
      return ctx.badRequest(
        null,
        formatError({
          id: 'Auth.form.error.blocked',
          message: 'Your account has been blocked by an administrator',
        })
      );
    }
    
    // The user never authenticated with the `local` provider.
    if (!user.password) {
      return ctx.badRequest(
        null,
        formatError({
          id: 'Auth.form.error.password.local',
          message:
            'This user never set a local password, please login with the provider used during account creation.',
        })
      );
    }
    
    const validatePassword = await strapi.plugins[
      'users-permissions'
    ].services.user.validatePassword(params.password, user.password);
    
      if(!validatePassword) {
        return ctx.badRequest(
          null,
          formatError({
            id: 'Auth.form.error.invalid',
            message: 'Identifier or password invalid.',
          })
        );
      }else {
        ctx.state.user = user
      }

    // go to users-permissions
    if (!ctx.state.user) {
      return next();
    }

    role = ctx.state.user.role;
    if(!role.type.startsWith('serviceaccount-')) {
      return ctx.badRequest(
        null,
        formatError({
          id: 'Auth.form.error.invalid',
          message: 'This account does not support basic auth.',
        })
      );
    }

    if (role.type === 'root') {
      return next();
    }

    if (
      _.get(await store.get({ key: 'advanced' }), 'email_confirmation') &&
      !ctx.state.user.confirmed
    ) {
      return handleErrors(ctx, 'Your account email is not confirmed.', 'unauthorized');
    }

    if (ctx.state.user.blocked) {
      return handleErrors(
        ctx,
        'Your account has been blocked by the administrator.',
        'unauthorized'
      );
    }

    const route = ctx.request.route;
    const permission = await strapi.query('permission', 'users-permissions').findOne(
      {
        role: role.id,
        type: route.plugin || 'application',
        controller: route.controller,
        action: route.action,
        enabled: true,
      },
      []
    );

    if (!permission) {
      return handleErrors(ctx, undefined, 'forbidden');
    }

    // Execute the policies.
    if (permission.policy) {
      return await strapi.plugins['users-permissions'].config.policies[permission.policy](ctx, next);
    }

  }
  // Execute the action.
  return next();
  
};

const handleErrors = (ctx, err = undefined, type) => {
  throw strapi.errors[type](err);
};

const formatError = error => [
  { messages: [{ id: error.id, message: error.message, field: error.field }] },
];

/**
 * Extracts credentials from basic auth header
 * @param {*} ctx 
 * @returns 
 */
function decodeBasicHeader(ctx) {
  const parts = ctx.request.header.authorization.split(' ');
  if (parts.length !== 2) return null;
  const scheme = parts[0];
  const credentials = parts[1];
  if (!/^Basic$/i.test(scheme)) return null;
  const decoded = Buffer.from(credentials, 'base64').toString();
  const [identifier, password] = decoded.split(':');
  return { identifier, password };
}

