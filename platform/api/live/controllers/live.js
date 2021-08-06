'use strict';

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-controllers)
 * to customize this controller
 */

const admin = require("firebase-admin")

const firebase = initFirebase();

function initFirebase() {
  const serviceAccount = strapi.config.get('firebase.serviceAccount')
  const database = strapi.config.get('firebase.database')

  if (!database || !serviceAccount) {

    // firebase config is required for non-local environment
    if (strapi.config.environment === 'local') {
      console.warn('Firebase configuration is missing. Live feature will not work.');
      return null
    }
    else throw new Error('firebase configuration is missing.');
  } 

  return admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: database
  });
  
}

module.exports = {
  verify (ctx) {
    if (!firebase) throw new Error('firebase is not initialized.')
    return firebase.auth().createCustomToken(ctx.state.user.username)
  }
}
