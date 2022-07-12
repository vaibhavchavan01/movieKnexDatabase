const knex = require('../database/connectdb')
const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth')
const perm = require('../middleware/user_auth')
const movie_data = require('../validation/validation')
const moment = require('moment');
require('moment-duration-format')


router.post('/', auth, async (req, res) => {
    const convert = moment.duration(req.body.duration, "minutes").format("HH:mm");
    try {
        const {error} = movie_data.validateUser(req.body)
        if(error) return res.send(error.details[0].message)
        knex('movie').insert({
            title: req.body.title,
            language: req.body.language,
            duration: convert,
            release: req.body.release,
            description: req.body.description,
            genre_id: req.body.genre_id,
        })
            .returning('id')
            .then((response) => {
                const movieActorSet = req.body.actor_id.map(item =>
                    ({ actor_id: item, movie_id: response[0]['id'] }));
                console.log('fieldsToInsert:', movieActorSet);
                knex('movie_actor').insert(movieActorSet)
                    .then((actor) => {
                    })
                const movieDirectorSet = req.body.director_id.map(item =>
                    ({ director_id: item, movie_id: response[0]['id'] }));
                console.log('fieldsToInsert:', movieDirectorSet);
                knex('movie_director').insert(movieDirectorSet)
                    .then((actor) => {
                        res.status(201).send("ok")
                    })

            })
    } catch (error) {
        console.log(error);
    }
})

router.get('/', auth, perm, async (req, res) => {
    try {
        
        knex('movie').select('movie.id', 'title', 'movie_director.director_id', 'name')
            .innerJoin('movie_director', 'movie.id', '=', 'movie_director.movie_id')
            .innerJoin('people', 'people.id', '=', 'movie_director.director_id')
            .where({'movie.is_deleted':false})
            .then((response) => {
                const directordata = {}
                response.forEach(row => {
                    if (!(row.id in directordata)) {
                        directordata[row.id] = {
                            director: [],
                        }
                    }
                    directordata[row.id].director.push({
                        id: row.director_id,
                        name: row.name,
                    });
                });
                knex('movie').select('movie.id', 'title', 'language', 'duration', 'release', 'description', 'movie_actor.actor_id', 'name')
                    .innerJoin('movie_actor', 'movie.id', '=', 'movie_actor.movie_id')
                    .innerJoin('people', 'people.id', '=', 'movie_actor.actor_id')
                    .where({'movie.is_deleted':false})
                    .then((results) => {
                        const actordata = {};
                        results.forEach(row => {
                            if (!(row.id in actordata)) {
                                actordata[row.id] = {
                                    id: row.id,
                                    title: row.title,
                                    language: row.language,
                                    duration: row.duration,
                                    release: row.release,
                                    description: row.description,
                                    actor: [],
                                    director: directordata[row.id]['director']
                                }
                            }
                            actordata[row.id].actor.push({
                                id: row.actor_id,
                                name: row.name,
                            });
                        });
                        return res.send(actordata)
                    })
            })
    } catch (error) {
        console.log(error);
    }
})

router.patch('/:id', auth, perm, async (req, res) => {
    try {
        const {error} = movie_data.validate_movie(req.body)
        if(error) return res.send(error.details[0].message)
        const convert = moment.duration(req.body.duration, "minutes").format("HH:mm");
        knex('movie').update({ title: req.body.title, language: req.body.language, duration: convert, release: req.body.release, description: req.body.description }).where('id', req.params.id)
            .then(()=>{
                if(req.body.actor_id){
                return knex('movie_actor').where('movie_id', req.params.id).del()
                }    
            })
            .then(()=>{
                if(req.body.actor_id){
                const movieActorSet = req.body.actor_id.map(item =>
                ({ actor_id: item, movie_id: parseInt(req.params.id) }));
                return knex('movie_actor').insert(movieActorSet).where('movie_id', req.params.id)}})
            .then(()=>{
                if(req.body.director_id){
                return knex('movie_director').where('movie_id', req.params.id).del()
                }    
            })
            .then(()=>{
                if(req.body.director_id){
                const movieActorSet = req.body.director_id.map(item =>
                ({ director_id: item, movie_id: parseInt(req.params.id) }));
                return knex('movie_director').insert(movieActorSet).where('movie_id', req.params.id)}})
            .then((moviedata) => {                    
                return res.status(200).send('ok')

            })    
    } catch (error) {
        console.log(error);
    }
})

router.delete('/:id', auth, perm, async (req, res) => {
    try {
        knex('movie').update({'is_deleted':false}).where('id', req.params.id)
            .then((user) => {
                if (!user) {
                    return res.status(400).send({ message: 'data not found' })
                }
                return res.status(400).send({ message: 'record deleted' })
            })
    } catch (error) {
        console.log(error);
    }
})
module.exports = router