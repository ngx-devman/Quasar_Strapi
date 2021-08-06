const {environments} = require('../constants')
module.exports = ({ env }) => {
  const host = env("HOST", "localhost")
  const port = env.int("PORT", 1337)
  return {
    host,
    port,
    url: env("SERVER_URL", environments.back[process.env.NODE_ENV] || `http://${host}${port ? `:${port}` : ''}`),
    admin: {
      autoOpen: false,
      auth: {
        secret: env("AUTH"),
      },
    },
    cron: {
      enabled: false
    },
  }
};
