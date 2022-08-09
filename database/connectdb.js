
const knex = require('knex');
const knexfile = require('./knexfile');
const envtest =  'test'
const db = knex(knexfile[envtest])
module.exports = db