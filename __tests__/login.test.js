process.env.NODE_ENV = 'test';
const knex = require('../database/connectdb');
const request = require('supertest').agent("http://localhost:3000");
const auth = {}
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
describe('user login request', () => {
	test('It should user login', (done) => {
		const response = request
			.post('/api/login')
			.send({
				username: "vaibhav@gmail.com",
				password: "vaibhavchavan"
			})
			.expect(200)
			.end((err, res) => {
				if (err) throw err;
				auth.token = res.body['authToken']
				console.log('auth',auth);
				done();
			});
	})
	// test case for 'username and password' mismatch
	test('It should not user login', (done) => {
		request
			.post('/api/login')
			.send({
				username: "vaibhav1@gmail.com",
				password: "vaibhavchavana"
			})
			.expect(400)
			.end((err, res) => {
				if (err) throw err;
				console.log(res.body)
				done();
			});
	})

})
