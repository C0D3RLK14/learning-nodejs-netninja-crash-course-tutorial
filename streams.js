const fs = require('fs');

// Read streams
const readStream = fs.createReadStream('./docs/blog3.txt', {encoding : 'utf8'}  /* makes chunks of string */);

readStream.on('data', (chunk) => {
    console.log('--------------------------------------------***NEW CHUNK***----------------------------------------\n');
    console.log(chunk); // this again logs only the buffer not the string.
    // console.log(chunk.toString()); // To get the string output we could use this or pass a 2nd argument in '.createReadStream' to make it an string output

});

// Write streams
const writeStream = fs.createWriteStream('./docs/blogWriteStream.txt');

// //lets write the readStream
// readStream.on('data', (chunk) => {
//     console.log('--------------------------------------------***NEW CHUNK***----------------------------------------\n');
//     console.log(chunk); // this again logs only the buffer not the string.
//     // console.log(chunk.toString()); // To get the string output we could use this or pass a 2nd argument in '.createReadStream' to make it an string output

//     // Write stream part
//     writeStream.write('\n\nNEW CHUNK \n\n');
//     writeStream.write(chunk);
//     // NOTE: It doesn't if the read stream is encoded to 'utf8' or not the writeStream already writes in the raw format received not the the buffer.
// });

// If we are only reading and writing only readable text the best way and easiest way it use '.pipe'
readStream.pipe(writeStream);