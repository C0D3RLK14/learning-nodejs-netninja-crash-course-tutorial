/* All the blog routes in one file */

// imports
const express = require('express');
// creating an express router
const router = express.Router(); //create a new instance of a Router object
const Blog = require('../models/blog');

// blog routes
// replacing the 'app' instance with the 'router' instance (ex: app.get => router.get ...)

//scoping out the routes. like setting each route to the root file in their separate route files
//before scoping out
// router.get('/blogs', (req,res) => {
//     Blog.find().sort({ createdAt : -1 })
//         .then(result => {
//             res.render('index', { title : 'All blogs', blogs : result});
//         })
//         .catch(err => console.log(err));
// });

//after scoped out 
router.get('/', (req,res) => {
    Blog.find().sort({ createdAt : -1 })
        .then(result => {
            res.render('index', { title : 'All blogs', blogs : result});
        })
        .catch(err => console.log(err));
});

// Handling the post request to create a blog in the db
router.post('/', (req,res) => {
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
router.get('/create', (req,res) => {
    res.render('create', {title : 'Create a blog'});
});

// Handling the route parameters
router.get('/:id', (req,res) => {
    const id = req.params.id; 
    Blog.findById(id)
        .then(result => {
            res.render('details', { blog : result, title : 'Blog details' });
        })
        .catch(err => console.log(err));
});

router.delete('/:id', (req,res) => {
    const id = req.params.id;

    Blog.findByIdAndDelete(id)
        .then(result => {
            res.json({ redirect : '/blogs' });
        })
        .catch(err => console.log(err));
}); // NOTE: When scoping out routes if we handle requests on lets say '/blogs/create' we need set the route in request handling method as just '/create' unless if we keep it as '/blogs/create' the route we'll be using the request method for will be '/blogs/blogs/create'

// this is like a mini app()

//exporting the router
module.exports = router;