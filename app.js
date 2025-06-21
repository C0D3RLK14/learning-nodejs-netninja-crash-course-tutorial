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

// blog routes
app.get('/blogs', (req,res) => {
    Blog.find().sort({ createdAt : -1 })
        .then(result => {
            res.render('index', { title : 'All blogs', blogs : result});
        })
        .catch(err => console.log(err));
});

// Handling the post request to create a blog in the db
app.post('/blogs', (req,res) => {
    const blog = Blog(req.body); 

    blog.save()
        .then(result => {
            //logging a success record
            console.log(`Updated ${result.title} blog successfully to the database`);
            res.redirect('/');
        })
        .catch(err => console.log(err));
});

// create blog form
app.get('/blogs/create', (req,res) => {
    res.render('create', {title : 'Create a blog'});
});

// Handling the route parameters
app.get('/blogs/:id', (req,res) => {
    const id = req.params.id; 
    Blog.findById(id)
        .then(result => {
            res.render('details', { blog : result, title : 'Blog details' });
        })
        .catch(err => console.log(err));
});

app.delete('/blogs/:id', (req,res) => {
    const id = req.params.id;

    Blog.findByIdAndDelete(id)
        .then(result => {
            res.json({ redirect : '/blogs' });
        })
        .catch(err => console.log(err));
});

/* Redirects */
app.get('/about-us', (req,res) => {
    app.redirect('/about'); 
});

/* 404 page */
app.use((req,res) => {
    res.status(404).render('404', {title : '404'});
});