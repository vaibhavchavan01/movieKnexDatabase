const express = require('express');
const router = express.Router();
const knex = require('../database/connectdb')
const bcrypt = require('bcrypt');
const auth =require('../middleware/auth')
const perm = require('../middleware/user_auth')
const userValidation = require('../validation/validation')
const joi = require("joi");

router.post('/', async(req, res)=>{
    try {
    const {error} = userValidation.validateUser(req.body)
    if(error){
        return res.send(error)
    }
    const salt = await bcrypt.genSalt(10);
    const passwordHashed = await bcrypt.hash(req.body.password, salt);
    
        knex('user').insert({
            name: req.body.name,
            email: req.body.email,
            mobile: req.body.mobile,
            password: passwordHashed
        })
            .returning('id', req.body)
            .then((response) => {
                    res.status(200).json({response})
            })
    } catch (error) {
        console.log(error);
    }
})

router.get('/',auth, perm, async(req, res)=>{
    try {
        knex("user").select('*')
            .then((user) => {
                if (!user) {
                    return res.status(400).send({ message: 'data not found' })
                }
                return res.status(201).send(user)
            })
            .catch((error) => {
                return res.json({ success: false, message: 'bad request' });
            })
    } catch (error) {
        console.log(error);
    }
})

router.patch('/:id',auth, perm, async(req, res)=>{
    try {
        // console.log(req.params.id);
        knex('user').update(req.body).where('id', req.params.id)
            .then((user) => {
                if (!user) {
                    return res.status(400).send({ message: 'data not found' })
                }
                return res.status(201).send({ message: 'record updated', updated_data: user })
            })
    } catch (error) {
        console.log(error);
    }
})

router.delete('/:id',auth, perm, async(req, res)=>{
    try {
        knex('user').del().where('id', req.params.id)
            .then((user) => {
                if (!user) {
                    return res.status(400).send({ message: 'data not found' })
                }
                return res.status(201).send({ message: 'record updated', updated_data: user })
            })
    } catch (error) {
        console.log(error);
    }
})

module.exports = router