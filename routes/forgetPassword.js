const express = require('express');
const router = express.Router();
const knex = require('../database/connectdb')
const bcrypt = require('bcrypt');
// const forgetPasswordValidation = require('../validation/validation')

router.post('/', async(req, res)=>{
    try {
        const salt =await  bcrypt.genSalt(10);
        const passwordHashed =  await bcrypt.hash(req.body.password, salt);
        knex('user').select('email').where({'email':req.body.username})
        .then((response)=>{
            if((!response)) return res.status(200).send({msg:'both field must be same'})   
            if(! req.body.password && req.body.confirm_password) 
            return res.status(200).send({msg:'both field must be same'})
                knex('user').update({'password':passwordHashed}).where({'email':req.body.username})
                .then((result)=>{
                    return res.status(200).send("forget password successfully")
                })
        })     
    } catch (error) {
        return res.status(400).send({ Error: error.message })
    }
})
module.exports = router