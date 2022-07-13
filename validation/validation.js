const joi = require("joi");
function validateUser(user){
    const userValidation = joi.object({
        name: joi.string().alphanum().min(3).max(40).trim(true).required(),
        email: joi.string().email().trim(true).required(),
        mobile:joi.string().length(10),
        password: joi.string().min(8).trim(true).required(),
        is_admin: joi.boolean().default(false),
    });
    return joi.validate(user, userValidation)
}

function validate_genre(genre){
    const genre_data=  joi.object({
        name: joi.string().alphanum().min(3).max(40).trim(true).required() 
    });
    return joi.validate(genre, genre_data)
}

function validate_movie(movie){
    const movie_data = joi.object({
        title: joi.string().alphanum().min(1).max(40).trim(true).required(),
        language: joi.string().alphanum().trim(true).required(),
        duration:joi.number().required(),
        release: joi.number().required(),
        description: joi.string().trim(true).required(),
        genre_id : joi.number().required(),
        actor_id: joi.array().unique(),
        director_id: joi.array().unique(),
    });
    return joi.validate(movie, movie_data)
}

function validate_login(username){
    const usernameValidation = joi.object({
        username: joi.string().email().trim(true).required(),
        password: joi.string().min(8).trim(true).required(),
    });
    return joi.validate(username, usernameValidation)
}

function validate_people(people){
    const people_data = joi.object({
        name: joi.string().min(3).max(40).trim(true).required()
    });
    return joi.validate(people, people_data)
}

exports.validate_user = validateUser;
exports.validate_genre = validate_genre;
exports.validate_movie = validate_movie;
exports.validate_login = validate_login;
exports.validate_people = validate_people;


