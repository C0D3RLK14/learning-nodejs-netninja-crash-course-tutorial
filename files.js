//imports
const fs = require('fs'); // Node module to manage the file system

// // Reading files
// fs.readFile('./docs/blog1.txt', (err, data) => {
//     if (err) {
//         console.log(err);
//     }
//     // console.log(data); // This logs the buffer
//     console.log(data.toString());
// });
// // NOTE: '.readFile' is an asynchronous method like 'setTimeout' and 'setInterval' as it takes time to read the file. Therefore Node doesn't wait for the output but continues executing the remaining code
// console.log("See I was logged first.");

// // Writing files
// fs.writeFile('./docs/blog1.txt', 'hello, ninjas from writeFile', () => {
//     console.log('file written');
// });
// // NOTE: This overwrites the entire file

// //if the file doesn't exist if creates a file and then writes into it
// fs.writeFile('./docs/blog2.txt', 'hello, ninjas from writeFile', () => {
//     console.log('file written');
// });

// // LK: How do I add to the existing content in a file?

// // Directories
// //as this gives an error if the folder exists lets check if exists
// if(!fs.existsSync('./assets')){
//     fs.mkdir('./assets', (err) => {
//         if (err) {
//             console.log(err);
//         } else {
//             console.log("Folder created");
//         }
//     });
// } else {
//     fs.rmdir('./assets', (err) => {
//         if(err) {
//             console.log(err);
//         } else {
//             console.log("Folder deleted");
//         }
//     });
//     //now its a toggle function
// }

// Deleting files
if(fs.existsSync('./docs/blogDelete.txt')) {
    fs.unlink('./docs/blogdelete.txt', (err) => {
        if(err) {
            console.log(err);
        } else {
            console.log("File deleted");
        }
    });
} else {
    console.log("File does not exsist")
}