//import filesystem node module
// Question 2:
// const fs = require('fs');

//import the file manager module i created
const fm = require("./file-manager.js");

fs.writeFileSync("hello.txt", "Hello World");
fs.appendFileSync("hello.txt", "\nThis file was created with Node.js");

const data = fs.readFileSync("hello.txt",{encoding:"utf-8"});

console.log(data);

fs.unlinkSync("hello.txt");


//Question 3:
//in another file - file-manager.js

