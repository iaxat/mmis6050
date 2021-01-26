// Write the code for Question 4 here
// This programming will include the asynchronous method

// Resources Used: Class lecture Module 1.1
// Online resource : Stack Overflow
// Video lecture In-class - Module 1.1 + codes

// program starts here


const fs = require("fs");


const filename = "working.txt";



const createFileAsync = (filename, content, callback) => {
    fs.writeFile(filename, content, (error) => {
        if (error) {
            callback("error creating file : " + error.message, undefined);
        } else {
            callback(undefined, "successful file creation ");
        }
    });
};




const appendFileAsync = (filename, content, callback) => {
    fs.appendFile(filename, content, (error) => {
        if (error) {
            callback("error in appending " + error.message), undefined;
        } else {
            callback(undefined, "successfully appended")
        }
    });
};




const readFileSAsync = (filename, callback) => {
    fs.readFile(filename, "Utf8", (error, contents) => {
        if (error) {
            // console.log("test")
            callback("error reading file : "+error.message, undefined)
        } else {
            console.log(contents);
            callback(undefined, " successfully read the file")
        }
    });
};




const renameFileSAsync = (currentName, newName, callback) => {
    fs.rename(currentName, newName, (error) => {
        if (error) {
            // console.log("check")
            callback("error renaming the file : " + error.message, undefined)
        } else {
            callback(undefined, " file renamed");
        }
    });
};





createFileAsync(filename, " hi I have created a file ", (error, result) => {
    if (error) {
        console.log(error);
    } else {
        console.log(result);
        appendFileAsync(filename, "\n appending some extra line", (error, result) => {
            if (error) {
                // console.log("here ")
                console.log(error);
            } else {
                // console.log("there ")
                // console.log("hey :"+ result);
                readFileSAsync("working.txt", (error, result) => {
                    if (error) {
                        console.log(error)
                    }else {
                        console.log(result);
                        renameFileSAsync("working.txt", "complete.txt", (error, result) => {
                            if (error) {
                                console.log(error);
                            }else {
                                console.log(result);
                            }
                        });
                    }
                });
            }
        });
    }
});




console.log('Starting the Program');