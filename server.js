/* Status Code */
/*                              **  100 range (informational)      **
** 200 => OK                    **  200 range (success)            **
** 301 => Resource moved        **  300 range (code for redirects) **
** 404 => Not found             **  400 range (user client errors) **
** 500 => Internal server error **  500 range (server errors)      */

/* Creating a server */
const http = require('http');
const fs = require('fs');
const server = http.createServer((req, res) => {
    // console.log('request made');
    // console.log(req); // logs the request object with info of the request made by the user
    console.log(req.url, req.method); // NOTE: '/' is the url just after 'localhost:3000' and 'GET' you know what it is
    // 'req.url' returns the url requested by the user and 'req.method' returns the request method. If the user searches for 'localhost:3000/about' the url output becomes '/about'

    /* Response object */
    // set response headers
    // // header for the content type being sent to the browser
    // res.setHeader('Content-Type', 'text/plain'); // This mentions what type of data we are sending back to the browser

    // res.write('hello, ninjas'); // This is what we write back to the browser
    // res.end(); // This mentions that we have finished writing back to the browser and send what we have written to the browser.

    // we could send HTML back to the browser as well
    res.setHeader('Content-Type', 'text/html');

    /* Basic routing */
    // matching the url requested with the file paths
    // And setting status codes
    let path = './views/';
    const url = req.url;

    switch(url) {
        case '/':
            path += 'index.html';
            res.statusCode = 200;
            break;
        case '/about':
            path += 'about.html';
            res.statusCode = 200;
            break;
        default:
            path += '404.html';
            res.statusCode = 404;
            break;
    }

    // sending a html file to the browser
    // passing the 'path' instead of a set path
    fs.readFile(path, (err, data) => {
        if(err) {
            console.log(err);
            res.end();
        } else {
            // res.write(data); // As we are just sending the 'data' through only one write statement we could include it in the end statement as follows.
            res.end(data);
        }
    });
}); 
// NOTE: We don't have store the server in a variable in our case but for some purposes like using web sockets we would have to.

// This make the server functional by making it listen to a port
server.listen(3000, 'localhost', () => {
    console.log('listening for requests on port 3000');
});
