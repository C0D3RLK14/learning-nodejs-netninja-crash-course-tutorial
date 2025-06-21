//imports
require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const blogRoutes = require('./routes/blogRoutes')

//setting up an express app
const app = express(); 
//setting view engine of the app
app.set('view engine', 'ejs'); 

/* Middle ware */
app.use(express.static('public'));
// using morgan a 3rd party logger
app.use(morgan('tiny'));
// middleware to convert the post request data to a workable type
app.use(express.urlencoded()); 

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

/*Routes*/
app.get('/', (req,res) => {
    //redirecting to the blogs 
    res.redirect('/blogs');
});

app.get('/about', (req,res) => {
    res.render('about', {title : 'About'})
});

//redirect
app.get('/about-us', (req,res) => {
    app.redirect('/about'); 
});

//blog routes
app.use('/blogs', blogRoutes);


//404 page 
app.use((req,res) => {
    res.status(404).render('404', {title : '404'});
});