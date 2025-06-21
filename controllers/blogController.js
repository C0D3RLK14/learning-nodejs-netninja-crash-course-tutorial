/* All the request handling logic in one file */
// function index (functions we creating) => blog_index (get all blogs), blog_create_get, blog_create_post, blog_delete

//imports
const Blog = require('../models/blog');

const blog_index = (req,res) => {
    Blog.find().sort({ createdAt : -1 })
        .then(result => {
            // before scoping views
            // res.render('index', { title : 'All blogs', blogs : result});
            //after scoping views
            res.render('blogs/index', { title : 'All blogs', blogs : result});
        })
        .catch(err => console.log(err));
};

const blog_create_post = (req,res) => {
    const blog = Blog(req.body); 

    blog.save()
        .then(result => {
            //logging a success record
            console.log(`Updated ${result.title} blog successfully to the database`);
            res.redirect('/');
        })
        .catch(err => console.log(err));
};

const blog_create_get = (req,res) => {
    res.render('blogs/create', {title : 'Create a blog'});
};

const blog_get = (req,res) => {
    const id = req.params.id; 
    Blog.findById(id)
        .then(result => {
            res.render('blogs/details', { blog : result, title : 'Blog details' });
        })
        .catch(err => {
            console.log(err);
            res.status(404).render('404', {title : '404'});
        });
};

const blog_delete = (req,res) => {
    const id = req.params.id;

    Blog.findByIdAndDelete(id)
        .then(result => {
            res.json({ redirect : '/blogs' });
        })
        .catch(err => {
            console.log(err);
            res.status(404).render('404', {title : '404'});
        });
};

module.exports = {
    blog_index,
    blog_create_post,
    blog_create_get,
    blog_get,
    blog_delete
};