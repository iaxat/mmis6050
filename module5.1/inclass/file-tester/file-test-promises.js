// Create, append, read, and rename a file using promise chaining

const fs = require("fs").promises;

fs.writeFile("file-promise.txt", "Hello World!\n")
.then(() => {
    return fs.appendFile("file-promise.txt", "This file was created using promises.")
}).then(() => {
    return fs.readFile("file-promise.txt", "utf8");
}).then((data) => {
    console.log("File Contents: ", data);
}).then(() => {
    return fs.rename("file-promise.txt", "file-promise-complete.txt");
}).catch((err) => {
    console.log("Error! ", err);
});