const dotenv = require('dotenv').config();
const express = require('express')
const app = express();
const port = process.env.PORT || 5000;
const cors = require('cors')

//middleware for req.body
app.use(express.urlencoded({ extended: false }))
app.use(cors());
app.use(express.json());

const user = require('./routes/user');
const genre = require('./routes/genre');
const movie = require('./routes/movie');
const people = require('./routes/people');
const login = require('./routes/login')
const forgetPassword = require('./routes/forgetPassword')
//for json response


app.use('/api/user', user);
app.use('/api/genre', genre);
app.use('/api/movie', movie);
app.use('/api/people', people);
app.use('/api/login', login);
app.use('/api/forgetPassword', forgetPassword);

// how to create routes
app.listen(port, () => {
    console.log('server listening at http://localhost:'+[port]);
})


