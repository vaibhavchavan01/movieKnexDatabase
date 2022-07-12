/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema
    .createTable('genre', function(table){
        table.increments('id').primary();
        table.string('name', 50).notNullable();
        table.boolean('is_deleted').defaultTo(false);
        table.timestamps(true, true);
    })
    .createTable('movie',function(table){
        table.increments('id').primary();
        table.string('title', 25).notNullable();
        table.string('language', 25).notNullable();
        table.time('duration').notNullable();
        table.integer('release').notNullable();
        table.string('description', 255).notNullable();
        table.boolean('is_deleted').defaultTo(false);
        table.integer('genre_id').unsigned().notNullable().references('id').inTable('genre').onDelete('CASCADE');
        table.timestamps(true, true);
    })
    .createTable('people', function(table){
        table.increments('id').primary();
        table.string('name', 255).notNullable();
        table.boolean('is_deleted').defaultTo(false);
        table.timestamps(true, true);
    })
    .createTable('movie_actor', function(table){
        table.increments('id').primary();
        table.integer('actor_id').unsigned().notNullable().references('id').inTable('people').onDelete('CASCADE');
        table.integer('movie_id').unsigned().notNullable().references('id').inTable('movie').onDelete('CASCADE');
        table.timestamps(true, true);    
    })
    .createTable('movie_director', function(table){
        table.increments('id').primary();
        table.integer('director_id').unsigned().notNullable().references('id').inTable('people').onDelete('CASCADE');
        table.integer('movie_id').unsigned().notNullable().references('id').inTable('movie').onDelete('CASCADE');
        table.timestamps(true, true);    
    })

};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema
    .dropTableIfExists("movie_actor")
    .dropTableIfExists("movie_director")
    .dropTableIfExists("movie")
    .dropTableIfExists("genre")
    .dropTableIfExists("people")
};
