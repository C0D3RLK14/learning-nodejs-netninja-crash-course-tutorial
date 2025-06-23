/* All the blog routes in one file */

// imports
const express = require('express');
// creating an express router
const router = express.Router(); //create a new instance of a Router object

//importing blogController
const blogController = require('../controllers/blogController');


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
// adding controllers
// before adding controllers
// router.get('/', (req,res) => {
//     Blog.find().sort({ createdAt : -1 })
//         .then(result => {
//             res.render('index', { title : 'All blogs', blogs : result});
//         })
//         .catch(err => console.log(err));
// });

//after adding controllers
router.get('/', blogController.blog_index);



// Handling the post request to create a blog in the db
router.post('/', blogController.blog_create_post);

// create blog form
router.get('/create', blogController.blog_create_get);

// Handling the route parameters
router.get('/:id', blogController.blog_get);

router.delete('/:id', blogController.blog_delete); // NOTE: When scoping out routes if we handle requests on lets say '/blogs/create' we need set the route in request handling method as just '/create' unless if we keep it as '/blogs/create' the route we'll be using the request method for will be '/blogs/blogs/create'

// this is like a mini app()

//exporting the router
module.exports = router;