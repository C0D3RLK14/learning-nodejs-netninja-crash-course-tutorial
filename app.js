//importing express
const express = require('express');

// importing morgan
const morgan = require('morgan');

/* Mongoose */
// importing mongoose
const mongoose = require('mongoose');

//setting up an express app
const app = express(); 

/* MongoDB */
// connecting to mongodb
// URL Structure
// const mongodbURL = 'mongodb+srv://{USER}:{PASSWORD}@practise.8xzrewz.mongodb.net/?retryWrites=true&w=majority&appName=Practise';
const mongodbURL = 'mongodb+srv://netninja:H3ll0N3tNinj4@practise.8xzrewz.mongodb.net/?retryWrites=true&w=majority&appName=Practise';
// connecting to db
mongoose.connect(mongodbURL);

/* Registering EJS view engine */
app.set('view engine', 'ejs'); 

//listen for requests
app.listen(3000); 

/* Middleware */
/* Static files */
app.use(express.static('public'));

// using morgan a 3rd party logger
app.use(morgan('tiny'));

//listening for get requests' url
app.get('/', (req,res) => {
    // passing a list
    const blogs = [
        {title : 'Yoshi finds eggs', snippet : 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Temporibus natus eius ipsa atque ipsum omnis et rerum repudiandae ducimus. Asperiores maxime amet obcaecati earum culpa facere consequuntur ut excepturi reiciendis.'},
        {title : 'Mario finds eggs', snippet : 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Temporibus natus eius ipsa atque ipsum omnis et rerum repudiandae ducimus. Asperiores maxime amet obcaecati earum culpa facere consequuntur ut excepturi reiciendis.'},
        {title : 'How to defeat bowser', snippet : 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Temporibus natus eius ipsa atque ipsum omnis et rerum repudiandae ducimus. Asperiores maxime amet obcaecati earum culpa facere consequuntur ut excepturi reiciendis.'}
    ];

    // passing data from app.js to index view
    res.render('index', {title : 'Home', blogs}); 
});

// Testing app.get again
app.get('/about', (req,res) => {
    res.render('about', {title : 'About'})
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


