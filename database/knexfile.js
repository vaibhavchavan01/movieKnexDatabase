// Update with your config settings.

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */

const config = process.env
const path = require('path')
module.exports = {

  development: {
    client: 'postgresql',
    connection:{
      database:config.DATABASE,
      user:config.USER,
      password:config.PASSWORD,
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
