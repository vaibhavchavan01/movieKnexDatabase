process.env.NODE_ENV = 'test';
var knex = require('../database/connectdb');
const request = require('supertest');
var server = request.agent("http://localhost:3000")

describe('user API Routes', function () {

	beforeEach(() => {
		return knex.migrate.rollback()
			.then(() => knex.migrate.latest())
			.then(() => knex.seed.run())
	});
	// afterEach(() => {
	// 	return knex.migrate.rollback();
	// 	});
	describe('user GET request', () => {
		it('It should get all user records', (done) => {
			server
				.get('/api/user')
				.set('Authorization','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjpbeyJlbWFpbCI6InZhaWJoYXZAZ21haWwuY29tIiwibW9iaWxlIjoiNzcwOTI3MjE0MiIsInBhc3N3b3JkIjoiJDJiJDEwJGFpMTFGbHpOLkIvYlc0ZjdLaG9rNy40UDVkQUVZUzFDOFJ4eW1STUJZZWNIUVN0WnZLdU5HIiwiaWQiOjEsImlzX2FkbWluIjp0cnVlfV0sImlhdCI6MTY2MDAyODY1MiwiZXhwIjoxNjYwMTE1MDUyfQ.T2w5kBCt5oRdmC9uS5s9cK-mXh0GUbnKP4EF7ClSqFk')
				.expect(200)
				.end((err, res) => {
					if (err) throw (err)
					done()
				})
		})
	})
	describe('user POST request', () => {
		it('It should POST', (done) => {
			server
				.post('/api/user')
				.send({
					name: "abc",
					email: "abc@gmail.com",
					mobile: "7777777777",
					password: "qwertyui"
				})
				.expect(201)
				.end((err, res) => {
					if (err) throw (err)
					done()
				})
		})
	})
});