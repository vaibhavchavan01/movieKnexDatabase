const dotenv = require('dotenv').config();
const express = require('express')
const app = express();
const path = require('path')
var bodyParser = require('body-parser');
// const connectdb = require('./database/connectdb.js')
const web = require('./routes/web.js')
const port = process.env.PORT || 3000;
const DATABASE_URL = process.env.DATABASE_URL;
const cors = require('cors')

//middleware for req.body
app.use(express.urlencoded({ extended: false }))

//use for middleware (req and res)
app.use(cors());
app.use(bodyParser.json())

//for json response
app.use(express.json());
//database connections
// connectdb(DATABASE_URL);

// load routes
app.use('/', web);

//jwt key
const JwtKey = "JwtSecreteKey"

//set template engine
// app.set('view engine', 'ejs')

//static file
app.use('/', express.static(path.join(process.cwd(), "static")))
app.use('/edit', express.static(path.join(process.cwd(), "static")))

// how to create routes
app.listen(port, () => {
    console.log('server listening at http://localhost:'+[port]);
})


