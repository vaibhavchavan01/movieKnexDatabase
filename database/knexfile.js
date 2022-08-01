// Update with your config settings.

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */

const config = process.env
const path = require('path')
module.exports = {

  production: {
    client: 'pg',
    connection:{
      host: 'db',
      database: 'docker',
      user: 'docker',
      password: 'postgres',
      port: 5432
      
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

  development: {
    client: 'postgresql',
    connection: {
      database: 'moviedb',
      user:     'postgres',
      password: 'vc',
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
  }

};
