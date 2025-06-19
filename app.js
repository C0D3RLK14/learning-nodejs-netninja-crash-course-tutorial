//importing express
const express = require('express');

/* 3rd party middleware */
// importing morgan
const morgan = require('morgan');

//setting up an express app
const app = express(); 

/* Registering EJS view engine */
app.set('view engine', 'ejs'); 

//listen for requests
app.listen(3000); 

/* Middleware */
/* next() */
// NOTE: We have pass the 'next' method as the 3rd argument in the '.use()' inorder to use it(callback function)
// app.use((req,res,next) => {
//     console.log(`New request made:\n
//         host : ${req.hostname}\n
//         path : ${req.path}\n
//         method : ${req.method}\n`);
//     // res.end();
//     next();
// });
// NOTE: As there is no '.end()' mentioned above the browser hangs. And if we add it then the response is sent to the browser and any after it is ignored. Therefore we will be using '.next()' to indicate the browser to move on.

/* Static files */
// NOTE: By default static files like css stylesheets are protected by the server (node.js) from the browser for security reasons. If we want use them we can use the '.static' method in express middlewares to define a public directory where we can keep the static files we need to give access to the browser as below
app.use(express.static('public'));

// using morgan a 3rd party logger
app.use(morgan('tiny'));

// testing another middleware
// app.use((req,res,next) => {
//     console.log('in the next middleware \n');
//     next();
// });

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


