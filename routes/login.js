const knex = require('../database/connectdb')
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const Jwt = require("jsonwebtoken");
const usernameValidation=require('../validation/validation')

router.post('/', async(req, res)=>{
    try {
        const {error} = usernameValidation.validate_login(req.body)
        if(error) return res.send(error.details[0].message)
            knex('user').select('email', 'mobile', 'password', 'id', 'is_admin')
                .where({ 'email': req.body.username })
                .orWhere({ 'mobile': req.body.username })
                .then((user) => {
                    if (Object.keys(user).length === 0) {
                        return res.status(400).send({ message: 'data not found' })
                    }
                    else {
                        return bcrypt.compare(req.body.password, user[0]['password'])
                        .then((result) => {
                            if (!result) {
                                return res.status(400).send({ message: 'wrong password' })
                            }
                            else {
                                Jwt.sign({ user }, process.env.SECRETE_KEY, { expiresIn: "1d" }, (err, token) => {
                                    if (err) { res.status(404).json({ bad_request: "Data not found" }) }
                                    res.send({ authToken: token })
                                })
                            }
                        })
                    }
                })    
    } catch (error) {
        return res.status(400).send({ Error: error.message })
    }
})

module.exports = router