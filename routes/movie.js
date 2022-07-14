const knex = require('../database/connectdb')
const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth')
const perm = require('../middleware/user_auth')
const movie_data = require('../validation/validation')
const bookshelf = require('bookshelf')(knex)
const moment = require('moment');
require('moment-duration-format')


router.post('/', auth,perm, async (req, res) => {
    const convert = moment.duration(req.body.duration, "minutes").format("HH:mm");
    // try {
    const { error } = movie_data.validate_movie(req.body)
    if (error) return res.send(error.details[0].message)
    return knex.transaction(function (t) {
        return knex("movie")
            .transacting(t)
            .insert({
                title: req.body.title,
                language: req.body.language,
                duration: convert,
                release: req.body.release,
                description: req.body.description,
                genre_id: req.body.genre_id
            })
            .returning('id')
            .then((response) => {
                const movieActorSet = req.body.actor_id.map(item =>
                    ({ actor_id: item, movie_id: response[0]['id'] }));
                return knex('movie_actor')
                    .transacting(t)
                    .insert(movieActorSet)
                    .then(() => {
                        const movieDirectorSet = req.body.director_id.map(item =>
                            ({ director_id: item, movie_id: response[0]['id'] }));
                        return knex('movie_director')
                            .transacting(t)
                            .insert(movieDirectorSet)
                    })
            })
            .then(t.commit)
            .catch(t.rollback)
    })
        .then((result) => {
            res.status(201).send(result)
        })
        .catch((error) => {
            return res.status(400).send({ Error: error.message })
        });
})

router.get('/', auth, perm, async (req, res) => {
        const People = bookshelf.model('People', {
            hidden: ["is_deleted","created_at","updated_at","_pivot_movie_id","_pivot_director_id","_pivot_actor_id"],

            tableName: 'people'
          })
        const Movie = bookshelf.model('Movie', {
            hidden:["is_deleted","genre_id","created_at","updated_at"],
            tableName: 'movie',
            actor() {
              return this.belongsToMany('People','movie_actor','movie_id','actor_id')
            },
            director() {
                return this.belongsToMany('People','movie_director','movie_id','director_id')
              }
          })
        return Movie.fetchAll({withRelated:['actor','director']}).then((director) => {
        return res.send(director);
        })
       .catch((error) => {
        return res.status(400).send({ Error: error.message })
      })    
})   
router.patch('/:id', auth, perm, async (req, res) => {
    const { error } = movie_data.validate_movie(req.body)
    if (error) return res.send(error.details[0].message)
    const convert = moment.duration(req.body.duration, "minutes").format("HH:mm");
    return knex.transaction((t) => {
        return knex("movie")
            .transacting(t)
            .update({ title: req.body.title, language: req.body.language, duration: convert, release: req.body.release, description: req.body.description })
            .where('id', req.params.id)
            .then(() => {
                if (req.body.actor_id) {
                    return knex('movie_actor').where('movie_id', req.params.id).del()
                        .transacting(t)
                }
            })
            .then(() => {
                if (req.body.actor_id) {
                    const movieActorSet = req.body.actor_id.map(item =>
                        ({ actor_id: item, movie_id: parseInt(req.params.id) }));
                    return knex('movie_actor').insert(movieActorSet).where('movie_id', req.params.id)
                        .transacting(t)
                }
            })
            .then(() => {
                if (req.body.director_id) {
                    return knex('movie_director').where('movie_id', req.params.id).del()
                        .then(() => {
                            if (req.body.director_id) {
                                return knex('movie_director').where('movie_id', req.params.id).del()
                            }
                        })
                }
            })
            .then(() => {
                if (req.body.director_id) {
                    return knex('movie_director').where('movie_id', req.params.id).del()
                        .transacting(t)
                }
            })
            .then(() => {
                if (req.body.director_id) {
                    const movieActorSet = req.body.director_id.map(item =>
                        ({ director_id: item, movie_id: parseInt(req.params.id) }));
                    return knex('movie_director').insert(movieActorSet).where('movie_id', req.params.id)
                        .transacting(t)
                }
            })
            .then(t.commit)
            .catch(t.rollback)
    })
        .then((result) => {
            res.status(201).send(result)
        })
        .catch((error) => {
            return res.status(400).send({ Error: error.message })
        });
})

router.delete('/:id', auth, perm, async (req, res) => {
    try {
        knex('movie').update({ 'is_deleted': true }).where('id', req.params.id)
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