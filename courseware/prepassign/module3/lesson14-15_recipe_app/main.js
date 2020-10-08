"use strict";
// Import needed modules
const express = require("express"),
  app = express(),
  errorController = require("./controllers/errorController"),
  homeController = require("./controllers/homeController"),
  layouts = require("express-ejs-layouts");

// Set application variables
app.set("port", process.env.PORT || 3000);
app.set("view engine", "ejs");

// Set up application middleware
app.use(express.static("public"));
app.use(layouts);
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(homeController.logRequestPaths);

//  Routes for testing
app.get("/name", homeController.respondWithName);
app.get("/items/:vegetable", homeController.sendReqParam);


// Routes for home page, courses page, and contact page
app.get("/", homeController.index);
app.get("/courses", homeController.showCourses);
app.get("/contact", homeController.showContact);
app.post("/contact", homeController.postContact);


// Set up error handling middleware at the end
// These should only be applied if no other routes apply
app.use(errorController.logErrors);
app.use(errorController.respondNoResourceFound);
app.use(errorController.respondInternalError);


// Launch the server
app.listen(app.get("port"), () => {
  console.log(`Server running at https://localhost:${app.get("port")}`);
});
