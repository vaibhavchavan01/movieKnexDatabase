const knex = require('../database/connectdb')
const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth')
const perm = require('../middleware/user_auth')

// router.get('/',auth , perm, async(req, res)=>{
//     try {
//         knex('movie_actor').select('*')
//         .then((result)=>{
            
//         })
//     } catch (error) {
        
//     }
// })

module.exports = router