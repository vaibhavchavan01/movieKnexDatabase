process.env.NODE_ENV = 'test';
var knex = require('../database/connectdb');
var request = require('supertest');
var server = request.agent("http://localhost:3000")
token = null
// jest.setTimeout(10000)
beforeAll(async () => {
  return knex.migrate.rollback()
    .then(() => knex.migrate.latest())
    .then(() => knex.seed.run())
});
beforeAll(async () => {
  const response = await server
    .post('/api/login')
    .set('Accept', 'application/json')
    .send({
      username: "vaibhav@gmail.com",
      password: "vaibhavchavan"
    })
    .expect(200)
  token = response.body['authToken']
});
describe('movie API Routes', function () {
  describe('movie POST request', () => {
    it('It should POST movie records', (done) => {
      server
        .post('/api/movie')
        .set('Authorization', token)
        .send({
          title: "Dangal3",
          language: "Hindi",
          duration: 120,
          release: 2022,
          description: "Hindi Movie",
          genre_id: 2,
          actor_id: [1, 2, 3, 4],
          director_id: [5]
        })
        .expect(201)
        .end((err, res) => {
          if (err) throw (err)
          done()
        })
    })
    it('It should NOT response movie POST request', (done) => {
      server
        .post('/api/movie')
        .set('Authorization', token)
        .send({
          title: "Dangal",
          language: "Hindi",
          duration: 129,
          release: 2016,
          description: "Hindi Movie",
          genre_id: 2,
          actor_id: [1, 2, 3, 4],
          director_id: []
        })
        .expect(400)
        .end((err, res) => {
          if (err) throw (err)
          done()
        })
    })
  });
  describe('movie GET request', () => {
      it('It should GET movie records', (done) => {
        server
          .get('/api/movie')
          .set('Authorization', token)
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .expect(200)
          .end((err, res) => {
            if (err) throw (err)
            done()
          })
      })
      it('It should NOT GET movie records', (done) => {
        server
          .get('/api/movie/' + 1)
          .set('Authorization', token)
          .set('Accept', 'application/json')
          .expect(404)
          .end((err, res) => {
            if (err) throw (err)
            done()
          })
      })
  });
  
  describe('movie UPDATE request', function () {
    setTimeout(() => {
      it('It should UPDATE movie records', async(done) => {
        
        server
          .patch('/api/movie/1')
          .set('Authorization', token)
          .send({
            title: "Dangal1",
            language: "Hindi",
            duration: 122,
            release: 2017,
            description: "Hindi Movie",
            genre: 2,
            actor: [1, 2, 3, 4],
            director: [5]
          })
          .expect(200)
          .end((err, res) => {
            if (err) throw (err)
            done()
          })
        })
      },20000)
      it('It should NOT UPDATE movie records', (done) => {
        server
          .patch('/api/movie/' + 4)
          .set('Authorization', token)
          .send({
            title: "Dangal",
            language: "Hindi",
            duration: 125,
            release: 2017,
            description: "Hindi Movie",
            genre: 2,
            actor: [1, 2, 3, 4],
            director: [5]
          })
          .expect(404)
          .end((err, res) => {
            if (err) throw (err)
            done()
          })
      })
  })
})