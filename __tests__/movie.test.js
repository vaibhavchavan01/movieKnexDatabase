process.env.NODE_ENV = 'test';
var knex = require('../database/connectdb');
var request = require('supertest');
var server = request.agent("http://localhost:3000")

describe('movie API Routes', function () {

	// beforeEach(() => {
	// 	return knex.migrate.rollback()
	// 		.then(() => knex.migrate.latest())
	// 		.then(() => knex.seed.run())
	// });
    describe('movie POST request', () => {
		it('It should POST movie records', (done) => {
			server
				.post('/api/movie')
                .set('Authorization','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjpbeyJlbWFpbCI6InZhaWJoYXZAZ21haWwuY29tIiwibW9iaWxlIjoiNzcwOTI3MjE0MiIsInBhc3N3b3JkIjoiJDJiJDEwJGt5aW1EeU1Cb0ZBVGtjeWZtUWtHT2VvVW91RVVLTWhQRm1TWS91NHlmTk9kb3lzSXZVZ3htIiwiaWQiOjEsImlzX2FkbWluIjp0cnVlfV0sImlhdCI6MTY1OTk1Njk0MiwiZXhwIjoxNjYwMDQzMzQyfQ.Rn39sB8mKUJasLe0AtyIoRurnScMjkbsMfKGJIkPlC0')
                .send({
                    title: "Dangal",
                    language: "Hindi",
                    duration: 129,
                    release: 2016,
                    description: "Hindi Movie",
                    genre_id: 2,
                    actor_id:[1,2,3,4],
                    director_id:[5]       
                })
				.expect(201)
				.end((err, res) => {
                    // console.log(res.body);
					if (err) throw (err)
					done()
				})
		})
	})
})
describe('movie GET request', () => {
    it('It should GET movie records', (done) => {
        server
            .get('/api/movie')
            .set('Authorization','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjpbeyJlbWFpbCI6InZhaWJoYXZAZ21haWwuY29tIiwibW9iaWxlIjoiNzcwOTI3MjE0MiIsInBhc3N3b3JkIjoiJDJiJDEwJGt5aW1EeU1Cb0ZBVGtjeWZtUWtHT2VvVW91RVVLTWhQRm1TWS91NHlmTk9kb3lzSXZVZ3htIiwiaWQiOjEsImlzX2FkbWluIjp0cnVlfV0sImlhdCI6MTY1OTk1Njk0MiwiZXhwIjoxNjYwMDQzMzQyfQ.Rn39sB8mKUJasLe0AtyIoRurnScMjkbsMfKGJIkPlC0')
            .expect(200)
            .end((err, res) => {
                console.log(res.body);
                if (err) throw (err)
                done()
            })
    })
})
// })