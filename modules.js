// // Importing and running the 'people.js' file
// const people = require('./people.js'); // relative path of 'people.js' file
// // NOTE: This code only runs the 'people.js' file, but stores nothing unless 'people.js' file exports any value.

// // But,
// console.log(people); // This logs an empty object. This is bcz 'people.js' is not exporting any data(like there is no return statement).
// // As we can see, now the 'people' list in 'people.js' logged to the console after exporting it.

// Importing only properties required
// const {people} = require('./people');
// This only imports the people attribute of the object exported by 'people.js'
// NOTE: The attribute being imported should exactly match the attribute being exported 'people' imported should match 'people' exported

// Importing multiple properties
const {people, ages} = require('./people');
// NOTE: Still the 'people.js' file runs(The log statement in it). I guess we could use this to make something like a docstring

console.log(people, ages);

// Importing default node modules
const os = require('os'); // Your Operating System details

// console.log(os);
console.log(os.machine(), os.platform(), os.release(), os.version(), os.homedir(), os.cpus(), os.userInfo(), os.hostname());