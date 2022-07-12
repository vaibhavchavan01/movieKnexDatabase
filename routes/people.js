const knex = require('../database/connectdb')
const express = require('express');
const router = express.Router();
const auth =require('../middleware/auth')
const perm = require('../middleware/user_auth')

router.post('/', auth, perm, async(req, res)=>{
    try {
        const {error} = movie_data.validate_movie(req.body)
        if(error) return res.send(error.details[0].message)
        knex('people').select('name')
        .where({'name':req.body.name})
        .then((result)=>{
            if(Object.keys(result).length !== 0){
                console.log('result:', result);
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
        console.log(error);
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
        console.log(error);
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
        console.log(error);
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
        console.log(error);
    }
})
module.exports = router