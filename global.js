/* The Global Object */
/* In Node.js the outermost block scope we run our code is called the "global" object. In a browser window it is the "window" object. */

// console.log(global);
// This returns all the methods and properties of the 'global' object

// global.setTimeout(() => {
//     console.log("Hi, I am from the setTimeout method");
// }, 3000);
// As we are in the outermost block scope we are by default running our code in the global object. Therefore we do not need to explicitly call 'global's methods as 'global.setTimeout' like so.
// NOTE: Also, even though I mentioned above as we are in the outer most block scope, so we don't have to mention global.method. We don't need to mention that even if we are in an inner block scope of the global object(any we can't access a block scope out of the global object) due to inheritance.

// setTimeout(() => {
//     console.log("Hi, I am from the setTimeout method. Without explicitly mentioning setTimeout method of global.");
// }, 3000);
// NOTE: BTW this 'setTimeout' methods runs parallely not sequentially(like at the same time not one after the other), I guess that's why they are called asynchronous. HEHEHE

// setInterval(() => {
//     console.log("Hi, I am from the set Interval method.");
// }, 1000);

// To end a set interval method after a certain time we should use 'setInterval' with 'setTimeout'
// const intervalMethod = setInterval(() => {
//     console.log("Hi, I am from the set Interval method.");
// }, 1000); // NOTE: This method could be defined either before or after the 'setTimeout' method clear this method.

// setTimeout(() => {
//     console.log("Reached 5 seconds, Ending interval method now. Interval method terminated.")
//     clearInterval(intervalMethod);
// }, 5000);

// 'setTimeout' method runs a function after a set timeout period in ms
// 'setInterval' method runs a function per every set time interval in ms

// console.log(__dirname); //Prints the absolute path of this file
// console.log(__filename);//Prints the absolute path of this file with its name

// NOTE: Eventhough both 'global' and 'window' are global objects the window object does not have most of the methods and properties the 'window' object has. But this is fine as those methods and objects are more related to the Document Object Model (DOM) which is for the frontend. But as Node is used for backend development we don't need to worry.

// console.log(document.querySelector(body)); // #ReferenceError.