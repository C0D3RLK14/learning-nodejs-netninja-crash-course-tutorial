//importing .env
require('dotenv').config();

//importing express
const express = require('express');

// importing morgan
const morgan = require('morgan');

// importing mongoose
const mongoose = require('mongoose');

// importing the blog model (moved to 'blogRoutes', then to 'blogController')

// importing the blog routes
const blogRoutes = require('./routes/blogRoutes')

//setting up an express app
const app = express(); 

// connecting to mongodb
const mongodbURL = process.env.MONGODB_URL;

mongoose.connect(mongodbURL)
    .then((result) => {
        console.log("connected to Mongo DB old method");
        //listen for requests
        app.listen(3000); 
        console.log("listening for requests on port 3000");
    })
    .catch((err) => console.log(err)); 

/* Registering EJS view engine */
app.set('view engine', 'ejs'); 

/* Middle ware */
app.use(express.static('public'));
// using morgan a 3rd party logger
app.use(morgan('tiny'));
// middleware to convert the post request data to a workable type
app.use(express.urlencoded()); 

/*Routes*/
app.get('/', (req,res) => {
    //redirecting to the blogs 
    res.redirect('/blogs');
});

app.get('/about', (req,res) => {
    res.render('about', {title : 'About'})
});

/* Redirects */
app.get('/about-us', (req,res) => {
    app.redirect('/about'); 
});

//blog routes
// app.use(blogRoutes);
//scoping out the routes. This is next level of routing
app.use('/blogs', blogRoutes);


/* 404 page */
app.use((req,res) => {
    res.status(404).render('404', {title : '404'});
});