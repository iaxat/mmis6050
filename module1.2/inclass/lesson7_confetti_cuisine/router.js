// his module provides a "routes" object that stores all application routes for both GET and POST requests
// The post and get methods of this module register a new route by adding a new key/value pair to the GET and POST nested objects
// The handle method is called to execute the proper method when a route is called

"use strict";

const httpStatus = require("http-status-codes"),
  contentTypes = require("./contentTypes"),
  utils = require("./utils");

const routes = {
  "GET": {},
  "POST": {}
};

// this function will be invoked by the server to run the proper callback method
exports.handle = (req, res) => {
  try {
    routes[req.method][req.url](req, res);
  } catch (e) {
    res.writeHead(httpStatus.OK, contentTypes.html);
    utils.getFile("views/error.html", res);
  }
};

// this function is used to register GET routes
exports.get = (url, action) => {             
  routes["GET"][url] = action;
};

// this function is used to register POST routes
exports.post = (url, action) => {
  routes["POST"][url] = action;
};
