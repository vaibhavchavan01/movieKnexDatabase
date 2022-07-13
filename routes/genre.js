const express = require('express');
const router = express.Router();
const knex = require('../database/connectdb')
const auth =require('../middleware/auth')
const perm = require('../middleware/user_auth')
const genre_data = require('../validation/validation')

router.post('/', auth, perm, async(req, res)=>{
    try {
        const {error} = genre_data.validateUser(req.body)
    if(error)
        return res.send(error.details[0].message)
    knex('genre').insert({
        name: req.body.name,
        })
        .returning('id')
        .then((response) => {
            return res.status(201).send(response)
        })
    } catch (error) {
        return res.status(400).send({ Error: error.message })
    }
})

router.get('/', auth, perm, async(req, res)=>{
    try {
        knex("genre").select('*')
            .then((user) => {
                if (!user) {
                    return res.status(400).send({ message: 'data not found' })
                }
                return res.status(201).send(user)
            })
            .catch((error) => {
                return res.send(error)
            })
    } catch (error) {
        return res.status(400).send({ Error: error.message })
    }
})

router.patch('/:id', auth, perm, async(req, res)=>{
    try {
        const {error} = genre_data.validateUser(req.body)
    if(error)
        return res.send(error.details[0].message)
        knex('genre').update(req.body).where('id', req.params.id)
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
        knex('genre').update({'is_deleted':true}).where('id', req.params.id)
            .then((user) => {
                if (!user) {
                    return res.status(400).send({ message: 'data not found' })
                }
                return res.status(400).send({ message: 'record deleted' })
            })
    } catch (error) {
        return res.status(400).send({ Error: error.message })
    }
})

module.exports = router