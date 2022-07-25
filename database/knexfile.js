// Update with your config settings.

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */

const config = process.env
const path = require('path')
module.exports = {

  development: {
    client: 'pg',
    connection:{
      host: config.HOST,
      database: config.DATABASE,
      user: config.DB_USER,
      password: config.DB_PASSWORD,
      port: config.DB_PORT
      
      // driver:config.DRIVER,
      // port:config.PORT,
      // schema:config.SCHEMA,
      // host:config.HOST
      // database:'moviedb',
      // user:'postgres',
      // password:'vc'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    },
    seeds: {
      directory: './seeds'
    }
  },

  production: {
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user:     'username',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }

};
