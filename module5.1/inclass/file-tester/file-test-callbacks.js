// Create, append, read, and rename a file using callbacks

const fs = require("fs");

fs.writeFile("file-callback.txt", "Hello World!\n", (err) => {
    if (err) {
        console.log(err);
    } else {
        fs.appendFile("file-callback.txt", "This file was created using the callback pattern", () => {
            if (err) {
                console.log(err);
            } else {
                fs.readFile("file-callback.txt", "utf8", (err, data) => {
                    if (err) {
                        console.log(err);
                    } else {
                        console.log("File Contents: ", data);
                        fs.rename("file-callback.txt", "file-callback-complete.txt", (err) => {
                            if (err) {
                                console.log(err);
                            }
                        })
                    }
                })
            }
        })
    }
});