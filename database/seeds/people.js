/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('people').del()
  await knex('people').insert([
    {name:"Amir Khan"},
    {name:"Sakshi Tanwar"},
    {name:"Geeta"},
    {name:"Babita"},
    {name:"Nitesh Tiwari"},
  ]);
};
