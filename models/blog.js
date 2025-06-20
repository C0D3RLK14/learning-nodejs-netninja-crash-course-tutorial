// Creating a schema and a model for blog(s)
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// NOTE: 'Schema' is a constructor funciton which is used to create schemas
// creating a schema
const blogSchema = new Schema({
    //title : String /* This says there is a property 'title' with property type 'String' in the 'blogSchema', but if we want to give more property arguments like property type and is property requred, refer below */
    title : {
        type : String,
        required : true
    },
    snippet : {
        type : String,
        required : true
    },
    body : {
        type : String,
        required : true
    }
}, { timestamps : true }); // This creates an instance of a schema object and the second argument '{ timestamps : true }' generate and include timestamps to the model.

// creating a model
const Blog = mongoose.model('Blog', blogSchema); // NOTE: 'Blog' in '.model('Blog') is important as mongoose automatically searches for the collection with the Plural of 'Blog' which is 'Blogs' so you need make sure these match. The second argument 'blogSchema' tells mongoose to create a 'Blog' model using the 'blogSchema' schema

// Exporting to use the model 
module.exports = Blog;