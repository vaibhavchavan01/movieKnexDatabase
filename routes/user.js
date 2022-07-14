const express = require('express');
const router = express.Router();
const knex = require('../database/connectdb')
const bcrypt = require('bcrypt');
const auth =require('../middleware/auth')
const perm = require('../middleware/user_auth')
const userValidation = require('../validation/validation')
const reset_password = require('../validation/validation')
const config = process.env


router.post('/', async(req, res)=>{
    try {
    const {error} = userValidation.validateUser(req.body)
    if(error) return res.send(error.message)
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
        return res.status(400).send({ Error: error.message })
    }
})

router.post('/resetPassword',auth, async(req, res)=>{
    try {
        const {error} = reset_password.validate_resetPassword(req.body)
        if(error) return res.send(error.message)
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
    } catch (error) {
        return res.status(400).send({ Error: error.message })
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
        return res.status(400).send({ Error: error.message })
    }
})

router.patch('/:id',auth, perm, async(req, res)=>{
    try {
        knex('user').update(req.body).where('id', req.params.id)
            .then((user) => {
                if (!user) {
                    return res.status(400).send({ message: 'data not found' })
                }
                return res.status(201).send({ message: 'record updated', updated_data: user })
            })
    } catch (error) {
        return res.status(400).send({ Error: error.message })
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
        return res.status(400).send({ Error: error.message })
    }
})



module.exports = router