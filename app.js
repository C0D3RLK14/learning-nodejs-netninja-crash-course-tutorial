//importing express
const express = require('express');

// importing morgan
const morgan = require('morgan');

/* Mongoose */
// importing mongoose
const mongoose = require('mongoose');

// importing the blog model
const Blog = require('./models/blog');

//importing .env
require('dotenv').config();

//setting up an express app
const app = express(); 

// //testing .env
// console.log(process.env);

/* MongoDB */
// connecting to mongodb
// URL Structure
// const mongodbURL = 'mongodb+srv://{USER}:{PASSWORD}@practise.8xzrewz.mongodb.net/?retryWrites=true&w=majority&appName=Practise';
const mongodbURL = process.env.MONGODB_URL;
// connecting to db with mongoose
// mongoose.connect(mongodbURL); // NOTE: This method of connecting to the db doesn't work therefore we should use the method below. Bcz the connection needs time and with other dependencies need to get up running instantly it raises an error

// If we get any deprecation errors we should use the following statement
// mongoose.connect(mongodbURL, {useNewUrlParser : true, useUnifiedTopology : true}); // NOTE: This method is removed since Node.js Driver v.4.0 so no use

mongoose.connect(mongodbURL)
    .then((result) => {
        console.log("connected to Mongo DB old method");
        //listen for requests
        app.listen(3000); 
        console.log("listening for requests on port 3000");
    })
    .catch((err) => console.log(err)); 
// NOTE: Now this solves the timing issue mentioned above and this is the netninja method but this old so we'll learn the new method soon

// // Modern connection method with async/await
// const connectDB = async () => {
//     try {
//       await mongoose.connect(mongodbURL);
//       console.log('MongoDB connected successfully');
//     } catch (error) {
//       console.error('MongoDB connection error:', error);
//       process.exit(1); 
//     }
// };

// // Calling the connection function
// connectDB();

// // testing mongoose and mongodb with test routes
// //saving a blog to the db
// app.get('/add-blog', (req,res) => {
//     // saving a blog in the database
//     const blog = new Blog({
//         title : 'New blog',
//         snippet : 'About my new blog',
//         body : 'All about my new blog'
//     });

//     blog.save() /*here we use a method of the instance of a Blog*/
//         .then((result) => { 
//             res.send(result); // To see what the result looks like
//         })
//         .catch((err) => {
//             console.log(err);
//         });
// });
// //test
// app.get('/add-blog2', (req,res) => {
//     const blog = new Blog({
//         title : 'new blog 2',
//         snippet : 'new blog 2',
//         body : 'new blog 2'
//     });
//     blog.save()
//         .then(result => {
//             res.send(result);
//         })
//         .catch(err => console.log(err));
// });
// //test
// app.get('/add-blog3', (req,res) => {
//     const blog = new Blog({
//         title : 'new blog 3',
//         snippet : 'new blog 3',
//         body : 'new blog 3'
//     });
//     blog.save()
//         .then(result => {
//             res.send(result);
//         })
//         .catch(err => console.log(err));
// });

// //getting all the blogs
// app.get('/all-blogs', (req,res) => {
//     Blog.find() /*here we use a method of the Blog*/
//         .then((result) => {
//             res.send(result); // This is an array
//         })
//         .catch((err) => {
//             console.log(err);
//         }); // This finds all the blogs in the database
// });

// //getting a single blog by id
// app.get('/single-blog', (req,res) => {
//     Blog.findById('6855a42d8654e7f7259712cc')
//         .then(result => {
//             res.send(result);
//         })
//         .catch(err => console.log(err));
// });
// //test
// app.get('/single-blog2', (req,res) => {
//     Blog.findById('6855a991c93e9cd82d5932d1')
//         .then(result => {
//             res.send(result);
//         })
//         .catch(err => console.log(err));
// });
// //test
// app.get('/single-blog3', (req,res) => {
//     Blog.findById('6855a996c93e9cd82d5932d3')
//         .then(result => {
//             res.send(result);
//         })
//         .catch(err => console.log(err));
// });

/* Registering EJS view engine */
app.set('view engine', 'ejs'); 

/* Middleware */
/* Static files */
app.use(express.static('public'));

// using morgan a 3rd party logger
app.use(morgan('tiny'));

/*Routes*/

//listening for get requests' url
app.get('/', (req,res) => {
    // passing a dummy list
    // const blogs = [
    //     {title : 'Yoshi finds eggs', snippet : 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Temporibus natus eius ipsa atque ipsum omnis et rerum repudiandae ducimus. Asperiores maxime amet obcaecati earum culpa facere consequuntur ut excepturi reiciendis.'},
    //     {title : 'Mario finds eggs', snippet : 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Temporibus natus eius ipsa atque ipsum omnis et rerum repudiandae ducimus. Asperiores maxime amet obcaecati earum culpa facere consequuntur ut excepturi reiciendis.'},
    //     {title : 'How to defeat bowser', snippet : 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Temporibus natus eius ipsa atque ipsum omnis et rerum repudiandae ducimus. Asperiores maxime amet obcaecati earum culpa facere consequuntur ut excepturi reiciendis.'}
    // ];

    // passing data from app.js to index view
    // res.render('index', {title : 'Home', blogs});
    
    //redirecting to the blogs 
    res.redirect('/blogs');
});

// Testing app.get again
app.get('/about', (req,res) => {
    res.render('about', {title : 'About'})
});

// blog routes
app.get('/blogs', (req,res) => {
    // lets sort the blogs in descending order of creation latest to oldest
    Blog.find().sort({ createdAt : -1 /* 1 for ascending */ })
        .then(result => {
            //remember when getting all the blogs(documents) from the db it stores as an array(result), and as we have injected a for list to the index.ejs use ejs code we just need to replace the dummy array with the result array
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


