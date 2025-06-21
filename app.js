//importing .env
require('dotenv').config();

//importing express
const express = require('express');

// importing morgan
const morgan = require('morgan');

// importing mongoose
const mongoose = require('mongoose');

// importing the blog model
const Blog = require('./models/blog');

//setting up an express app
const app = express(); 

// //testing .env
// console.log(process.env);

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

/* Static files */
app.use(express.static('public'));

// using morgan a 3rd party logger
app.use(morgan('tiny'));

/*Routes*/
app.get('/', (req,res) => {
    //redirecting to the blogs 
    res.redirect('/blogs');
});

app.get('/about', (req,res) => {
    res.render('about', {title : 'About'})
});

// blog routes
app.get('/blogs', (req,res) => {
    Blog.find().sort({ createdAt : -1 })
        .then(result => {
            res.render('index', { title : 'All blogs', blogs : result});
        })
        .catch(err => console.log(err));
});


// create blog
app.get('/blogs/create', (req,res) => {
    res.render('create', {title : 'Create a blog'});
});

/* Redirects */
app.get('/about-us', (req,res) => {
    app.redirect('/about'); 
});

/* 404 page */
app.use((req,res) => {
    res.status(404).render('404', {title : '404'});
});


