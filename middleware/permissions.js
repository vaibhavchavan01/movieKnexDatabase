const knex = require('../database/connectdb')
const Jwt = require('jsonwebtoken');


const perm = function permission(req, res, next) {
    const roles = req.decoded['user'][0]
    try {
        if(!roles['is_Admin']){
            return res.status(401).send({msg:'you have no permission'})
        }
        next()
        return res.status(200)
    } catch (error) {
        console.log(error);
    }
}
module.exports = perm;