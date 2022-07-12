const config = process.env
const knex = require('../database/connectdb')
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const auth = require('../middleware/auth');

router.post('/',auth, async(req, res)=>{
    const userid=req.decoded['user'][0]
    const oldPassword= await bcrypt.compare(req.body.oldPassword, userid['password'])
    if(!oldPassword){
        return res.status(400).send({ message: 'wrong old password' })
    }
    if(req.body.password != req.body.confirm_password){
        return res.status(400).send({ message: 'password mismatch' })
    }
    const salt = await bcrypt.genSalt(10);
    const passwordHashed = await bcrypt.hash(req.body.password, salt); 
    knex('user').update({'password':passwordHashed}).where({'id':userid['id']})
    .then((response)=>{
        return res.status(200).send({msg:'password reset sucessfully'})
    })
    
})
module.exports = router
