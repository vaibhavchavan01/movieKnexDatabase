const express = require('express');
const { RegistarController, GenreController, MovieController, PeopleController, LoginController } = require('../../movieKnexDatabase/contrrollers/UserController.js');
// const { authenticate } = require('../middleware/auth.js');

// const UserData1 = require('../contrrollers/UserController.js')
const router = express.Router();
const auth = require('../middleware/auth');
const perm = require('../middleware/permissions');
 
//login url
router.post('/login', LoginController.login); 
//User URL's 
router.post('/register', RegistarController.register); 
router.get('/getData',auth, perm, RegistarController.getAllData); 
router.post('/deleteUserRecord/:id',auth, perm, RegistarController.deleteUserRecord); 
router.post('/updateUserRecord/:id',auth, perm, RegistarController.updateUserRecord); 

//Genre URL's
router.post('/postGenreData', perm, GenreController.postGenreData); 
router.get('/getGenreData', auth, GenreController.getGenreData); 
router.post('/updateGenreData/:id', perm, GenreController.updateGenreData); 
router.post('/deleteGenreData/:id', perm, GenreController.deleteGenreData); 

//Movie URL's
router.post('/postMovieData', perm, MovieController.postMovieData); 
router.get('/getMovieData', auth, MovieController.getMovieData); 
router.post('/upadteMovieData/:id', perm, MovieController.upadteMovieData); 
router.post('/deleteMovieData/:id', perm, MovieController.deleteMovieData); 

//people URL's
router.post('/postPeopleData', perm, PeopleController.postPeopleData); 
router.get('/getPeopleData', auth, PeopleController.getPeopleData); 
router.post('/upadtePeopleData/:id', perm, PeopleController.upadtePeopleData); 
router.post('/deletePeopleData/:id', perm, PeopleController.deletePeopleData); 

//moviePeople
// router.post('/postMoviePeopleData', MovieController.postMoviePeopleData); 
// router.get('/getMoviePeopleData', MovieController.getMoviePeopleData); 
// router.post('/upadteMoviePeopleData/:id', MovieController.upadteMoviePeopleData); 
// router.post('/deleteMoviePeopleData/:id', MovieController.deleteMoviePeopleData); 

// export default router
module.exports= router