// This module exports a function that uses the fs module to read a file and send it's contents back in the http response.
// If there is an error reading the file an error is sent back in the response.

"use strict";

const fs = require("fs"),
  httpStatus = require("http-status-codes"),
  contentTypes = require("./contentTypes");

  
  module.exports = {
    getFile: (file, res) => {
      fs.readFile(`./${file}`, (error, data) => {
        if (error) {
          res.writeHead(httpStatus.INTERNAL_SERVER_ERROR, contentTypes.html);
          res.end("There was an error serving content!");
        }
        res.end(data);
      });
    }
  };
