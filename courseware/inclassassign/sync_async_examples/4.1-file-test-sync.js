
// Import the file manager module that I created
const fm = require("./5.2-file-manager-async.js");

// Create a new file with default content
let count = 1;
const fileName = "hello.txt";


let createResult = fm.create(fileName, "Hello World!");
console.log(createResult);

doStuff();

// Add content to the file
let appendResult = fm.append(fileName, "\nThis file was created by Node.js!");
console.log(appendResult);

doStuff();

// Read the contents of the file and print to console
let contents = fm.read(fileName, "utf8");
console.log(contents);

doStuff();

// Delete the file
//fm.delete("hello.txt");


function doStuff() {
    console.log("Doing some synchronous stuff for time #" + count++);
}