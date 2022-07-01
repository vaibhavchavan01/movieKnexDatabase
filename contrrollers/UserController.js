const knex = require('../database/connectdb')
const bcrypt = require('bcrypt');
// const authenticate = require('../middleware/auth')
const Jwt = require("jsonwebtoken");
// var bodyParser = require('body-parser');
// const JwtKey = "secreteKey"
// const  check_permission = require('../middleware/permissions');
// const role = require('../middleware/role')

class RegistarController {
    static register = async (req, res) => {
        const salt = await bcrypt.genSalt(10);
        const passwordHashed = await bcrypt.hash(req.body.password, salt);
        try {
            knex('users').insert({
                name: req.body.name,
                email: req.body.email,
                mobile: req.body.mobile,
                password: passwordHashed
            })
                .returning('id', req.body)
                .then((response) => {
                        res.status(200).json({response})
                })
        } catch (error) {
            console.log(error);
        }
    }
    static getAllData = async (req, res) => {
        try {
            knex("users").select('*')
                .then((user) => {
                    if (!user) {
                        return res.status(400).send({ message: 'data not found' })
                    }
                    return res.status(201).send(user)
                })
                .catch((error) => {
                    return res.json({ success: false, message: 'bad request' });
                })
        } catch (error) {
            console.log(error);
        }
    }
    static deleteUserRecord = async (req, res) => {
        try {
            knex('users').del().where('id', req.params.id)
                .then((user) => {
                    if (!user) {
                        return res.status(400).send({ message: 'data not found' })
                    }
                    return res.status(201).send({ message: 'record deleted' })
                })
        } catch (error) {
            console.log(error);
        }
    }
    static updateUserRecord = async (req, res) => {
        try {
            knex('users').update({is_Admin : true}).where('id', req.params.id)
                .then((user) => {
                    console.log('user:',user);
                    if (!user) {
                        return res.status(400).send({ message: 'data not found' })
                    }
                    return res.status(201).send({ message: 'record updated', updated_data: user })
                })
        } catch (error) {

            console.log(error);
        }
    }
}
class LoginController {
    static login = async (req, res) => {
        try {
            if (req.body.username && req.body.password) {
                knex('users').select('email', 'mobile', 'password', 'id', 'is_Admin')
                    .where({ 'email': req.body.username })
                    .orWhere({ 'mobile': req.body.username })
                    .then((user) => {
                        const userid = user[0]['id']
                        if (Object.keys(user).length === 0) {
                            return res.status(400).send({ message: 'data not found' })
                        }
                        else {
                            return bcrypt.compare(req.body.password, user[0]['password'])
                                .then((result) => {
                                    // console.log(result);
                                    if (!result) {
                                        return res.status(400).send({ message: 'data not found' })
                                    }
                                    else {
                                        Jwt.sign({ user, userid }, process.env.SECRETE_KEY, { expiresIn: "1d" }, (err, token) => {
                                            if (err) { res.status(404).json({ bad_request: "Data not found" }) }
                                            res.send({ user, authToken: token })
                                            // permission(user);
                                            // console.log(user[0][0]);
                                        })

                                    }
                                })
                        }

                    })
                    
            }
            // console.log(user.id);
        } catch (error) {
            console.log(error);
        }

    }
}
class GenreController {
    static postGenreData = async (req, res)  => {
        // console.log(authenticate);
        try {
            knex('genre').insert({
                name: req.body.name,
            })
                .returning('id')
                .then((response) => {
                    console.log(response);
                    return res.status(201).send(response)
                })
        } catch (error) {
            console.log(error);
        }

    }
    static getGenreData = async (req, res) => {
        try {
            knex("genre").select('*')
                .then((user) => {
                    if (!user) {
                        return res.status(400).send({ message: 'data not found' })
                    }
                    return res.status(201).send(user)
                })
                .catch((error) => {
                    return res.json({ success: false, message: 'bad request' });
                })
            // console.log('result:', user);
        } catch (error) {
            console.log(error);
        }
    }
    static updateGenreData = async (req, res) => {
        try {
            console.log(req.params.id);

            knex('genre').update(req.body).where('id', req.params.id)
                .then((user) => {
                    if (!user) {
                        return res.status(400).send({ message: 'data not found' })
                    }
                    return res.status(201).send({ message: 'record updated', updated_data: user })
                })
        } catch (error) {
            console.log(error);
        }
    }
    static deleteGenreData = async (req, res) => {
        try {
            knex('genre').del().where('id', req.params.id)
                .then((user) => {
                    if (!user) {
                        return res.status(400).send({ message: 'data not found' })
                    }
                    return res.status(400).send({ message: 'record deleted' })
                })
        } catch (error) {
            console.log(error);
        }
    }

}

class MovieController {
    static postMovieData = async (req, res) => {
        try {
            knex('movie').insert({
                title: req.body.title,
                language: req.body.language,
                duration: req.body.duration,
                release: req.body.release,
                description: req.body.description,
                genre_id: req.body.genre_id,
                // release: req.body.release,
            })
                .returning('movie.id')
                .then((response) => {
                    console.log(response);
                    // knex('movie').select()
                    return res.status(201).send(response)
                })

        } catch (error) {
            console.log(error);
        }
    }
    static getMovieData = async (req, res) => {
        try {
            knex("movie").select('*')
                .then((user) => {
                    if (!user) {
                        return res.status(400).send({ message: 'data not found' })
                    }
                    return res.status(201).send(user)
                })
                .catch((error) => {
                    return res.json({ success: false, message: 'bad request' });
                })
            // console.log('result:', user);
        } catch (error) {
            console.log(error);
        }
    }
    static upadteMovieData = async (req, res) => {
        try {
            // console.log(req.params.id);

            knex('movie').update(req.body).where('id', req.params.id)
                .then((user) => {
                    if (!user) {
                        return res.status(400).send({ message: 'data not found' })
                    }
                    return res.status(201).send({ message: 'record updated', updated_data: user })
                })
        } catch (error) {
            console.log(error);
        }
    }
    static deleteMovieData = async (req, res) => {
        try {
            knex('movie').del().where('id', req.params.id)
                .then((user) => {
                    if (!user) {
                        return res.status(400).send({ message: 'data not found' })
                    }
                    return res.status(400).send({ message: 'record deleted' })
                })
        } catch (error) {
            console.log(error);
        }
    }

}
class PeopleController {
    static postPeopleData = async (req, res) => {
        try {
            knex('people').insert({
                name: req.body.name,
            })
                .returning('id')
                .then((response) => {
                    console.log(response);
                    return res.status(201).send(response)
                })

        } catch (error) {
            console.log(error);
        }
    }
    static getPeopleData = async (req, res) => {
        try {
            knex("people").select('*')
                .then((user) => {
                    if (!user) {
                        return res.status(400).send({ message: 'data not found' })
                    }
                    return res.status(201).send(user)
                })
                .catch((error) => {
                    return res.json({ success: false, message: 'bad request' });
                })
            // console.log('result:', user);
        } catch (error) {
            console.log(error);
        }
    }
    static upadtePeopleData = async (req, res) => {
        try {
            // console.log(req.params.id);

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
    }
    static deletePeopleData = async (req, res) => {
        try {
            knex('people').del().where('id', req.params.id)
                .then((user) => {
                    if (!user) {
                        return res.status(400).send({ message: 'data not found' })
                    }
                    return res.status(400).send({ message: 'record deleted' })
                })
        } catch (error) {
            console.log(error);
        }
    }

}
module.exports = { RegistarController, GenreController, MovieController, PeopleController, LoginController }