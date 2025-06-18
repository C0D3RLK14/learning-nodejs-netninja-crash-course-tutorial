// usually as a standard we name this file as 'app.js' which is also known as the express app.

//importing express
const express = require('express');

//setting up an express app
const app = express(); // the variable name 'app' is just a standard you could name it what you want. This creates an instance of express

//listen for requests
app.listen(3000); //This takes the default value of 'localhost' and port '3000' of it. This also create an instance of a server, we could save it to a variable if necessary.

//listening for get requests' url
app.get('/', (req,res) => {
    // // console.log(req.method); //These work normally as well in raw node
    // //we could use res.write and res.end, but with express,
    // res.send('<h1>Express App</h1>'); //This sets the content-type to match what's sent to the browser and also a status code automatically

    // passing and html file
    res.sendFile('./views/index.html', {root:__dirname}); // In express to send an file it requires the absolute path of the file, to overcome this and use relative path we should set the root to the root of the project by passing an object argument as above
});

// Testing app.get again
app.get('/about', (req,res) => {
    // res.send('<h1>Express App</h1><h3>About us</h3>'); 
    // // res.send('<h3>About us</h3>'); // ## Error: cannot use more than one res.send methods and no more than one argument

    res.sendFile('./views/about.html', {root:__dirname});
});

/* Redirects */
app.get('/about-us', (req,res) => {
    app.redirect('/about'); // express automatically creates the header and status code (304) for us
});

/* 404 page */
app.use((req,res) => {
    // res.sendFile('./views/404.html', {root : __dirname}); // NOTE: That even if the 404 web page is shown the status code is of success, bcz the use method doesn't explicitly say its file missing. Therefore,
    res.status(404).sendFile('./views/404.html', {root : __dirname});
});
// NOTE: The '.use()' does not get any argument for the link user requests. This runs either way the file exists or not if the code block upto here. How this works now at the moment is when a user request url matches with one of the above '.get()' the code block of that '.get()' runs and the rest of the code is ignored. Therefore inorder to get the function of displaying 404 page when page not found the '.use()' should be after all the available urls ('.get()'s)

