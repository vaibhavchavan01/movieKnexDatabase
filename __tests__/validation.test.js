const validation = require('../validation/validation')
const validationResponse = require('../validation/validationResponse')

describe('USER', () => {
    const invalid_data = {
        name: "abcd",
        email: "abcd@gmail.com",
        mobile: "9730983048",
        password: "qwertyu",
    }
    it('USER validation', () => {
        const res = validationResponse();
        validation.validate_user(invalid_data, res);
        expect(res.status).toHaveBeenCalledWith(400);
    })
    const valid_data = {
        name: "abcd",
        email: "abcd@gmail.com",
        mobile: "9730983048",
        password: "qwertyui",
    }
    it('invalid USER validation', () => {
        const res = validationResponse();
        validation.validate_user(valid_data, res);
        expect(res.status).toHaveBeenCalledWith(200);
    })
})
describe('GENRE', () => {
    const invalid_data = {
        name: "ab",
    }
    it('GENRE validation', () => {
        const res = validationResponse();
        validation.validate_genre(invalid_data, res);
        expect(res.status).toHaveBeenCalledWith(400);
    })
    const valid_data = {
        name: "abcdefg"
    }
    it('invalid GENRE validation', () => {
        const res = validationResponse();
        validation.validate_genre(valid_data, res);
        expect(res.status).toHaveBeenCalledWith(200);
    })
})
describe('MOVIE', () => {
    const valid_data = {
        title: "Dangal",
        language: "Hindi",
        duration: 129,
        release: 2016,
        description: "Hindi Movie",
        genre_id: 2,
        actor_id:[1,2,3,4],
        director_id:[5]       
    }
    it('MOVIE validation', () => {
        const res = validationResponse();
        validation.validate_movie(valid_data, res);
        expect(res.status).toHaveBeenCalledWith(200);
    })
    const invalid_data = {
        title: "Dangal",
        language: "Hindi",
        duration: 129,
        release: 2016,
        description: "Hindi Movie",
        genre_id: 2,
        actor_id:[1,2,3,4],
        director_id: []
    }
    it('invalid MOVIE validation', () => {
        const res = validationResponse();
        validation.validate_movie(invalid_data, res);
        expect(res.status).toHaveBeenCalledWith(400);
    })
})
describe('Login', () => {
    const valid_data = {
        username:"vaibhav@gmail.com",
        password: "vaibhavchavan"   
    }
    it('Login validation', () => {
        const res = validationResponse();
        validation.validate_login(valid_data, res);
        expect(res.status).toHaveBeenCalledWith(200);
    })
    const invalid_data = {
        username:"vaibhav@gmail.com",
        password: "vaibhav"   
    }
    it('invalid Login validation', () => {
        const res = validationResponse();
        validation.validate_login(invalid_data, res);
        expect(res.status).toHaveBeenCalledWith(400);
    })
})

