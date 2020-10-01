
// Import the file manager module that I created
const fm = require("./5.2-file-manager-async.js");

// Create a new file with default content
let count = 1;
const fileName = "hello.txt";


fm.create(fileName, "Hello World!", (err, result) => {
    if (err) {
        console.log(err);
    } else {
        console.log(result);
        // Add content to the file
        let appendResult = fm.append(fileName, "\nThis file was created by Node.js!", (err, result) => {
            if (err) {
                console.log(err);
            } else {
                console.log(result);
    }
});
    }
});
doStuff();



doStuff();

// // Read the contents of the file and print to console
// let contents = fm.read(fileName, "utf8");
// console.log(contents);

// doStuff();

// // Delete the file
// //fm.delete("hello.txt");


function doStuff() {
    console.log("Doing some synchronous stuff for time #" + count++);
}