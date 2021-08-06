module.exports = ({ env }) => {
  const databaseClient = env("DATABASE_CLIENT", "sqlite");
  return {
    defaultConnection: "default",
    connections: {
      default: {
        connector: "bookshelf",
        settings: {
          client: databaseClient,
          filename: env('DATABASE_FILENAME', '.tmp/data.db'),
          host: env("DATABASE_HOST", "localhost"),
          port: env.int("DATABASE_PORT", 3306),
          database: env("DATABASE_NAME", "platform"),
          username: env("DATABASE_USERNAME"),
          password: env("DATABASE_PASSWORD"),
          ssl: env.bool("DATABASE_SSL", false),
        },
        options: {
          debug: env('DATABASE_DEBUG', false),
          pool: {
            min: 0,
            /**
             * When using sqlite, max connection must be one:
             * https://github.com/knex/knex/issues/3176
             */
            max: databaseClient === 'sqlite' ? 1 : 100,
            idleTimeoutMillis: 3000000,
            createTimeoutMillis: 3000000,
            acquireTimeoutMillis: 3000000,
          },
          useNullAsDefault: true
        },
      },
      analytics: {
        connector: "bookshelf",
        settings: {
          client: env("DATABASE_CLIENT", "sqlite"),
          filename: env('DATABASE_FILENAME', '.tmp/data.db'),
          host: env("DATABASE_HOST_ANALYTICS", "localhost"),
          port: env.int("DATABASE_PORT", 3306),
          database: env("DATABASE_NAME", "analytics"),
          username: env("DATABASE_USERNAME"),
          password: env("DATABSE_PASSWORD_ANALYTICS"),
          ssl: env.bool("DATABASE_SSL", false),
        },
        options: {
          pool: {
            min: 0,
            max: databaseClient === 'sqlite' ? 1 : 100,
            idleTimeoutMillis: 3000000,
            createTimeoutMillis: 3000000,
            acquireTimeoutMillis: 3000000,
          },
          useNullAsDefault: true
        },
      }
    }
  }
};
