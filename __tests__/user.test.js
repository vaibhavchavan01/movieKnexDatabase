process.env.NODE_ENV = 'test';
var knex = require('../database/connectdb');
const request = require('supertest');
var server = request.agent("http://localhost:3000")
token=null
beforeAll(async() => {
	return knex.migrate.rollback()
		.then(() => knex.migrate.latest())
		.then(() => knex.seed.run())
});
beforeAll( async() =>{
		const response =   await server
			.post('/api/login')
			.set('Accept', 'application/json')
			.send({
				username: "vaibhav@gmail.com",
				password: "vaibhavchavan"
			})
			.expect(200)
			token = response.body['authToken']
			console.log('token:', token);
});
describe('user API Routes', ()=> {
	describe('user GET request', () => {
		it('It should get all user records', (done) => {
			server
				.get('/api/user')
				.set('Authorization',token)
				.expect(200)
				.end((err, res) => {
					if (err) throw (err)
					done()
				})
		})
		it('It should NOT get all user records', (done) => {
			server
				.get('/api/user/')
				.set('Authorization',token)
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
					name: "abcd",
					email: "abc@gmail.com",
					mobile: "7777777777",
					password: "qwertyui"
				})
				.expect(201)
				.end((err, res) => {
					if (err) throw (err)
					console.log(res);
					done()
				})
		})
		it('It should NOT POST request', (done) => {
			server
				.post('/api/user')
				.send({
					name: "abcd",
					email: "abc@gmail.com",
					mobile: "7777777777",
					password: "qwertyu"
				})
				.expect(400)
				.end((err, res) => {
					if (err) throw (err)
					console.log(res);
					done()
				})
		})
	})
});