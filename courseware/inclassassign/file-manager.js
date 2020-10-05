//Module that exports function for working with files
const fs = require("fs");


//module that exports functions with working file
const {formatWithOptions} = require("util");


//Create a file with specified content


const createFile = (fileName, contents) => {
    fs.writeFileSync(fileName,contents);
};

