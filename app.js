//importing express
const express = require('express');

//setting up an express app
const app = express(); 

/* Registering EJS view engine */
app.set('view engine', 'ejs'); // '.set' is like a method used to set settings in express. Now we changed the view engine to ejs

// NOTE: By default express and ejs look for views (HTML files) in the views directly (which netninja made us create before saying so). We could change it if we want using the following code
// app.set('views', 'myviews') // 'views' => 'myviews' folder

//listen for requests
app.listen(3000); 

//listening for get requests' url
app.get('/', (req,res) => {
    // // passing and html file
    // res.sendFile('./views/index.html', {root:__dirname}); 

    // serving the index file as a response
    res.render('index'); // This is called rendering a view
});

// Testing app.get again
app.get('/about', (req,res) => {
    // res.sendFile('./views/about.html', {root:__dirname});
    res.render('about')
});

// create blog
app.get('/blogs/create', (req,res) => {
    res.render('create');
});

/* Redirects */
app.get('/about-us', (req,res) => {
    app.redirect('/about'); 
});

/* 404 page */
app.use((req,res) => {
    // res.status(404).sendFile('./views/404.html', {root : __dirname});
    res.status(404).render('404');
});


