/* Creating a server */
const http = require('http');
const server = http.createServer((req, res) => {
    console.log('request made');
}); 
// NOTE: We don't have store the server in a variable in our case but for some purposes like using web sockets we would have to.

// This make the server functional by making it listen to a port
server.listen(3000, 'localhost', () => {
    console.log('listening for requests on port 3000');
});
