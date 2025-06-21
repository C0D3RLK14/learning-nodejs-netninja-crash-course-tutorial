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
app.use(express.urlencoded()); // NOTE: If we didn't use this the req would we undefined

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
// NOTE: If the post request isn't handled in the route specified in the action of the web form it would run the 404 method
app.post('/blogs', (req,res) => {
    // console.log(req.body); // Checking
    const blog = Blog(req.body); //As we saw that the 'req.body' returned a similar object in the form of the Blog schema we could directly pass it

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
    // getting the route parameter to a variable
    const id = req.params.id; // NOTE: 'id' in both the route '/blogs/:id' and 'req.params.id' must match. If lets say route is '/blogs/:nuts' then this is 'const id = req.params.nuts;
    // console.log(id); //testing if id works
    Blog.findById(id)
        .then(result => {
            // res.send(req.body);
            res.render('details', { blog : result, title : 'Blog details' });
        })
        .catch(err => console.log(err));
});
// NOTE: The get for route '/blogs/:id' should after all specific '/blogs/..' routes

app.delete('/blogs/:id', (req,res) => {
    const id = req.params.id;

    Blog.findByIdAndDelete(id)
        .then(result => {
            // Now we are going to redirect to the home page. 
            // But as the request was received in AJAX form we can't resond with 'res.redirect()' to redirect. Therefore we have send a respond in the form of text or JSON back to the browser, And we'll redirect through front end logic
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