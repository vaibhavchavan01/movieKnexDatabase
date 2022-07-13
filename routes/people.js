const knex = require('../database/connectdb')
const express = require('express');
const router = express.Router();
const auth =require('../middleware/auth')
const perm = require('../middleware/user_auth')
const people_data = require('../validation/validation')

router.post('/', auth, perm, async(req, res)=>{
    try {
        const {error} = people_data.validate_people(req.body)
        if(error) return res.send(error.details[0].message)
        knex('people').select('name')
        .where({'name':req.body.name})
        .then((result)=>{
            if(Object.keys(result).length !== 0){
                return res.status(400).json({msg:'record allready exist'});
            }
            knex('people').insert({
                name: req.body.name,
            })
                .returning('id')
                .then((response) => {
                    return res.status(201).send(response)
                })
        })
    } catch (error) {
        return res.status(400).send({ Error: error.message })
    }
})

router.get('/',auth, perm, async(req, res)=>{
    try {
        knex("people").select('id','name')
        .where({'is_deleted':false})
            .then((user) => {
                if (!user) {
                    return res.status(400).send({ message: 'data not found' })
                }
                return res.status(200).send(user)
            })
            .catch((error) => {
                return res.json({ success: false, message: 'bad request' });
            })
    } catch (error) {
        return res.status(400).send({ Error: error.message })
    }
})

router.patch('/:id', auth, perm, async(req, res)=>{
    try {
        knex('people').update(req.body).where('id', req.params.id)
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

router.delete('/:id', auth, perm, async(req, res)=>{
    try {
        knex('people').update({'is_deleted':true}).where('id', req.params.id)
            .then((user) => {
                if (!user) {
                    return res.status(400).send({ message: 'data not found' })
                }
                knex('people')
                return res.status(400).send({ message: 'record deleted' })
            })
    } catch (error) {
        return res.status(400).send({ Error: error.message })
    }
})
module.exports = router