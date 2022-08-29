const joi = require("joi");
// const validate_user= (user)=>(res)=>{
function validate_user(req, res){
    const userValidation = joi.object({
        name: joi.string().alphanum().min(3).max(40).trim(true).required(),
        email: joi.string().email().trim(true).required(),
        mobile:joi.string().length(10),
        password: joi.string().min(8).trim(true).required(),
    });
    const validation = joi.validate(req.body, userValidation)
    if(validation.error!=null) return res.status(400).send(validation.error)
    return res.status(200)
}

function validate_genre(req, res){
    const genre_data=  joi.object({
        name: joi.string().alphanum().min(3).max(40).trim(true).required() 
    });
    const validation = joi.validate(req, genre_data)
    if(validation.error!=null) return res.status(400).send(validation.error)
    return res.status(200)
}

function validate_movie(req, res){
    const movie_data = joi.object({
        title: joi.string().alphanum().min(1).max(40).trim(true).required(),
        language: joi.string().alphanum().trim(true).required(),
        duration:joi.number().required(),
        release: joi.number().required(),
        description: joi.string().trim(true).required(),
        genre_id : joi.number().required(),
        actor_id: joi.array().min(1),
        director_id: joi.array().min(1),
    });
    // return joi.validate(movie, movie_data)
    const validation = joi.validate(req.body, movie_data)
    if(validation.error!=null) return res.status(400).send(validation.error)
    return res.status(200)
}

function validate_login(req, res){
    const usernameValidation = joi.object({
        username: joi.string().email().trim(true).required(),
        password: joi.string().min(8).trim(true).required(),
    });

    const validation = joi.validate(req.body, usernameValidation)
    if(validation.error!=null) return res.status(400).send(validation.error)
    return res.status(200)
}

function validate_people(req, res){
    const people_data = joi.object({
        name: joi.string().min(3).max(40).trim(true).required()
    });
    // return joi.validate(people, people_data)
    const validation = joi.validate(req, people_data)
    if(validation.error!=null)return res.BAD_REQUEST
    return res.OK
}
function validate_resetPassword(req, res){
    const reset_password = joi.object({
        email: joi.string().email().trim(true).required(),
        password: joi.string().min(8).trim(true).required(), 
        confirm_password: joi.string().min(8).trim(true).required()
   });
    // return joi.validate(user, reset_password)
    const validation = joi.validate(req, reset_password)
    if(validation.error!=null)return res.BAD_REQUEST
    return res.OK
}
function validate_forgotPassword(req, res){
    const forgot_password = joi.object({
        email: joi.string().email().trim(true).required(),
        password: joi.string().min(8).trim(true).required(), 
        confirm_password: joi.string().min(8).trim(true).required()
   });
    // return joi.validate(user, forgot_password)
    const error = joi.validate(req, forgot_password)
    if(error) return res.status(400).send(error.details[0].message)
}
// module.exports = validate
exports.validate_user = validate_user;
exports.validate_genre = validate_genre;
exports.validate_movie = validate_movie;
exports.validate_login = validate_login;
exports.validate_people = validate_people;
exports.validate_resetPassword = validate_resetPassword;
exports.validate_forgotPassword = validate_forgotPassword;