const dotenv = require('dotenv').config();
const express = require('express')
const app = express();
const port = process.env.PORT || 3000;
const cors = require('cors')

//middleware for req.body
app.use(express.urlencoded({ extended: false }))
app.use(cors());

const user = require('./routes/user');
const genre = require('./routes/genre');
const movie = require('./routes/movie');
const people = require('./routes/people');
const login = require('./routes/login')
const resetPassword = require('./routes/resetPassword');
const movieActor = require('./routes/movieActor')
//for json response
app.use(express.json());

app.use('/api/user', user);
app.use('/api/genre', genre);
app.use('/api/movie', movie);
app.use('/api/people', people);
app.use('/api/login', login);
app.use('/api/resetPassword', resetPassword);
app.use('/api/movieActor', movieActor);

// how to create routes
app.listen(port, () => {
    console.log('server listening at http://localhost:'+[port]);
})


