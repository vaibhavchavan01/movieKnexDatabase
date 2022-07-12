/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('genre').del()
  await knex('genre').insert([
    {name: 'Action'},
    {name: 'Drama'},
    {name: 'Comedy'},
    {name: 'Thriller'},
    {name: 'Romance'},
    {name: 'Horror'},
  ]);
};
