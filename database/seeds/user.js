/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
 const config = process.env
 const bcrypt = require('bcrypt');
//  const path = require('path')
//  const dotenv = require('dotenv').config({path: path.join(__dirname,'../../env')});
 exports.seed = async function(knex) {
  // Deletes ALL existing entries
  const salt = await bcrypt.genSaltSync(10);
  const passwordHashed = await bcrypt.hashSync('vaibhavchavan', salt);
  await knex('user').del()    
  await knex('user').insert([
    {  
      name: 'vaibhav', 
      email: 'vaibhav@gmail.com', 
      mobile: '7709272142',
      password: passwordHashed,
      is_admin: true, 
  },
  ]);
};
