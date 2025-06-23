/* All the blog routes in one file */

// imports
const express = require('express');
// creating an express router
const router = express.Router(); 

//importing blogController
const blogController = require('../controllers/blogController');

//after adding controllers
router.get('/', blogController.blog_index);

// Handling the post request to create a blog in the db
router.post('/', blogController.blog_create_post);

// create blog form
router.get('/create', blogController.blog_create_get);

// Handling the route parameters
router.get('/:id', blogController.blog_get);

router.delete('/:id', blogController.blog_delete); 

//exporting the router
module.exports = router;