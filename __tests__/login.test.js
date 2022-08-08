process.env.NODE_ENV = 'test';
var knex = require('../database/connectdb');
const request = require('supertest').agent("http://localhost:3000");

// describe('user API Routes', function () {
beforeEach(() => {
	return knex.migrate.rollback()
		.then(() => knex.migrate.latest())
		.then(() => knex.seed.run())
		});

// afterEach(() => {
// 	return knex.migrate.rollback();
// });
// })
describe('user POST request', () => {
	test('It should user login', (done) => {
		request
			.post('/api/login')
			.send({
				username: "vaibhav@gmail.com",
				password: "vaibhavchavan"
			})
			// .expect(201)
			.end((err, res) => {
				if (err) throw err;
				expect(res.status).toEqual(200)
				// console.log(res.body);
				done();
			});
	})
})

