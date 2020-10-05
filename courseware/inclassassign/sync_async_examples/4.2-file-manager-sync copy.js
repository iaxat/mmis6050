// Module that exports functions for working with files

//Import the fs module
const fs = require("fs");

// Create a file with specified content
const createFile = (fileName, content) => {
   try {
        fs.writeFileSync(fileName, content);
        return "The file has been created!"
    } catch (err) {
        return "File not created: " + err.message;
    }      
};

// Append content to an existing file
const appendFile = (fileName, content) => {
    try {
        fs.appendFileSync(fileName, content);
        return "Content appended!";
    } catch (err) {
        return "Append failed: " + err.message;
    }    
};

// Read a file and return the contents
const readFile = (fileName) => {
    try {       
        return fs.readFileSync(fileName, "Utf8");
    } catch (err) {
        return "Read failed: " + err.message;
    }   
};

// Delete a file
const deleteFile = (fileName) => {
    try {
        fs.unlinkSync(fileName);
    } catch (err) {
        return "Delete failed: " + err.message;
    }
   
};

// Simulates a synchronous delay
function wait(ms) {
    var start = Date.now(),
        now = start;
    while (now - start < ms) {
      now = Date.now();
    }
}

// Make functions available to other modules
module.exports.create = createFile;
module.exports.append = appendFile;
module.exports.read = readFile;
module.exports.delete = deleteFile;