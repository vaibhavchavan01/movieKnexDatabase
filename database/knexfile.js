// Update with your config settings.
const dotenv = require('dotenv')
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
      database: process.env.DEV_DATABASE || 'moviedb',
      user:     process.env.DEV_USER || 'postgres',
      password: process.env.PASSWORD || 'vc',
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
  test: {
    client: 'postgresql',
    connection: {
      database: process.env.TEST_DATABASE || 'test',
      user:     process.env.TEST_USER || 'test',
      password: process.env.TEST_PASSWORD || 'test',
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations',
      directory: __dirname+'/migrations'
    
    },
    seeds: {
      directory: __dirname+'/seeds'
    }
  }

};
