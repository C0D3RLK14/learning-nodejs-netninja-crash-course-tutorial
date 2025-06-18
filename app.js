// usually as a standard we name this file as 'app.js' which is also known as the express app.

//importing express
const express = require('express');

//setting up an express app
const app = express(); // the variable name 'app' is just a standard you could name it what you want. This creates an instance of express

//listen for requests
app.listen(3000); //This takes the default value of 'localhost' and port '3000' of it. This also create an instance of a server, we could save it to a variable if necessary.

//listening for get requests' url
app.get('/', (req,res) => {
    // console.log(req.method); //These work normally as well in raw node
    //we could use res.write and res.end, but with express,
    res.send('<h1>Express App</h1>'); //This sets the content-type to match what's sent to the browser and also a status code automatically
});

