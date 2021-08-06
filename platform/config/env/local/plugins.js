module.exports = {
  /**
   * Files will be uploaded to ${projectRoot}/public/uploads
   * https://www.npmjs.com/package/strapi-provider-upload-local
   */
  upload: {
    provider: "local",
    providerOptions: {},
  },
  /**
   * To enable this fake local smtp server, navigate to /servers/fake-smtp and run `docker-compose up`
   * All the emails will go to the UI which runs on http://localhost:8025
   */
  email: {
    provider: 'smtp',
    providerOptions: {
      host: 'localhost', //SMTP Host
      port: 1025, //SMTP Port
      secure: false,
      username: 'my.username@gmail.com',
      password: 'my.password',
      rejectUnauthorized: false,
      requireTLS: false,
      connectionTimeout: 30000,
    },
    settings: {
      from: 'from@mailhog.local',
      replyTo: 'replyTo@mailhog.local',
    },
  },
};
