/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema
  .createTable('user', function(table) {
    table.increments('id').primary();
    table.string('name', 255).notNullable();
    table.string('email').notNullable().unique();
    table.string('mobile').notNullable().unique();
    table.string('password').notNullable();
    table.boolean('is_admin').defaultTo(false);
    table.timestamps(true, true);
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema
  .dropTableIfExists('user');
};
