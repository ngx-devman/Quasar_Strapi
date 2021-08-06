
module.exports = [
  {
    method: 'POST',
    url: '/content-manager/collection-types/plugins::users-permissions.user',
    data: {
      "username":"serviceaccount-storefront",
      "password": require("crypto").randomBytes(64).toString("base64"),
      role: process.env.STOREFRONT_ROLE_ID,
      "settings":null,
      "blocked":false,
      "userBilling":null,
      "country":"USA",
      "userShipping":null,
      "email":"strapi+storefront@sourcedigital.net",
      "features":null,
      "confirmed":true
    }
  },
  {
    method: 'POST',
    url: '/content-manager/collection-types/plugins::users-permissions.user',
    data: {
      "username":"serviceaccount-iam",
      "password": require("crypto").randomBytes(64).toString("base64"),
      role: process.env.IAM_ROLE_ID,
      "settings":null,
      "blocked":false,
      "userBilling":null,
      "country":"USA",
      "userShipping":null,
      "email":"strapi+iam@sourcedigital.net",
      "features":null,
      "confirmed":true
    }
  }
]