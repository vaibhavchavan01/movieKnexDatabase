const knex = require('../database/connectdb')
const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth')
const perm = require('../middleware/user_auth')
const movie_data = require('../validation/validation')
const bookshelf = require('bookshelf')(knex)
const moment = require('moment');
require('moment-duration-format')


router.post('/', auth, perm, async (req, res) => {
  const { error } = movie_data.validate_movie(req, res)
  if (error) return res.send(error.details[0].message)
  const convert = moment.duration(req.body.duration, "minutes").format("HH:mm");
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
    hidden: ["is_deleted", "created_at", "updated_at", "_pivot_movie_id", "_pivot_director_id", "_pivot_actor_id"],
    tableName: 'people'
  })
  const Movie = bookshelf.model('Movie', {
    hidden: ["is_deleted", "genre_id", "created_at", "updated_at"],
    tableName: 'movie',
    actor() {
      return this.belongsToMany('People', 'movie_actor', 'movie_id', 'actor_id')
    },
    director() {
      return this.belongsToMany('People', 'movie_director', 'movie_id', 'director_id')
    }
  })
  return Movie.fetchAll({ withRelated: ['actor', 'director'] }).then((director) => {
    return res.status(200).send(director);
  })
    .catch((error) => {
      return res.status(400).send({ Error: error.message })
    })
})
router.patch('/:id', auth, perm, async function(req, res){
  const { error } = movie_data.validate_movie(req, res)
  if (error) return res.send(error.details[0].message)
  const convert = moment.duration(req.body.duration, "minutes").format("HH:mm");
  
  knex("movie").select('id', 'title').where('id', req.params.id)
    .then(function(result) {
      console.log("abc ",result);
      if (Object.keys(result).length === 0) {
        console.log('1');
        return res.status(404).send('movie record not found')}
    })
    .catch(function(error) {
      console.log('4'); 
      return res.status(400).send({ Error: "error.message" })
    });
  
  knex.transaction(function(t) {
    knex("movie")
      .transacting(t)
      .update({ title: req.body.title, language: req.body.language, duration: convert, release: req.body.release, description: req.body.description })
      .where('id', req.params.id)
      .then(function() {
        
        if (req.body.actor) {
          return knex('movie_actor').where('movie_id', req.params.id).del()
            .transacting(t)
        }
      })
      .then(function(demo) {
        // console.log('demo:',demo);
        if (req.body.actor) {
          
          const movieActorSet = req.body.actor.map(item =>
            ({ actor_id: item, movie_id: parseInt(req.params.id) }));
          return knex('movie_actor').insert(movieActorSet)//.where('movie_id', req.params.id)
            .transacting(t)
        }
      })
      .then(function(){
        if (req.body.director) {
          return knex('movie_director').where('movie_id', req.params.id).del().transacting(t)
        }
      })
      .then(function() {
        if (req.body.director) {
          const movieActorSet = req.body.director.map(item =>
            ({ director_id: item, movie_id: parseInt(req.params.id) }));
          return knex('movie_director').insert(movieActorSet)//.where('movie_id', req.params.id)
            .transacting(t)
        }
      })
      .then(t.commit)
      .catch(t.rollback)
  })
  .then(function(){
    console.log('result:');
    return res.status(204).send({msg:"success"})
  })
  .catch(function(error){
    console.log('3');
    return res.status(400).send({ Error: "error.message" })
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