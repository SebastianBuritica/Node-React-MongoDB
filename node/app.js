require('dotenv').config();

const express = require('express');
const app = express();

const bodyParser = require('body-parser')

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())


// //importamos la conexión a la DB
// import db from "./database/db.js"
// //importamos nuestro enrutador
// import blogRoutes from './routes/routes.js'

// Mongoose will be used to connect to our MongoDB database
const mongoose = require('mongoose')

const port = process.env.PORT || 3002

// Lets connect to our MongoDB database
const uri = `mongodb+srv://${process.env.USER}:${process.env.PASSWORD}@cluster0.yphipax.mongodb.net/${process.env.DBNAME}?retryWrites=true&w=majority`;

    mongoose.connect(uri,
        { useNewUrlParser: true, useUnifiedTopology: true }
    )
        .then(() => console.log('Base de datos conectada'))
        .catch(err => console.log(err))



app.use(express.json())

// Setting up the routes
const blogRoutes = require('./routes/blogs')
app.use('/blogs', blogRoutes)

// app.use(express.urlencoded({extended:true}))

// This will get run whenever our server starts.
app.listen(port, () => {
    console.log(`App listening on port: ${port}`)
})