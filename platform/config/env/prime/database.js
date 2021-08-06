module.exports = ({ env }) => ({
  defaultConnection: "default",
  connections: {
    default: {
      connector: "bookshelf",
      settings: {
        client: "mysql",
        host: env("DATABASE_HOST"),
        port: env.int("DATABASE_PORT", 3306),
        database: env("DATABASE_NAME", "platform"),
        username: env("DATABASE_USERNAME", "root"),
        password: env("DATABASE_PASSWORD"),
        ssl: env.bool("DATABASE_SSL", false),
      },
      options: {
        pool: {
          min: 0,
          max: 100,
          idleTimeoutMillis: 3000000,
          createTimeoutMillis: 3000000,
          acquireTimeoutMillis: 3000000,
        },
      },
    },
    analytics: {
      connector: "bookshelf",
      settings: {
        client: "mysql",
        host: env("DATABASE_HOST_ANALYTICS"),
        port: env.int("DATABASE_PORT", 3306),
        database: env("DATABASE_NAME", "analytics"),
        username: env("DATABASE_USERNAME", "root"),
        password: env("DATABSE_PASSWORD_ANALYTICS"),
        ssl: env.bool("DATABASE_SSL", false),
      },
      options: {
        pool: {
          min: 0,
          max: 100,
          idleTimeoutMillis: 3000000,
          createTimeoutMillis: 3000000,
          acquireTimeoutMillis: 3000000,
        },
      },
    }
  },
});
