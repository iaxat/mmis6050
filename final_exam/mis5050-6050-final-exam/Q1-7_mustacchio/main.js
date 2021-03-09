"use strict";

const express = require("express"),
  app = express(),
  layouts = require("express-ejs-layouts"),
  mongoose = require("mongoose"),
  path = require("path");

// Controllers
const homeController = require("./controllers/homeController");
const stylesController = require("./controllers/stylesController");
const blogPostsController = require("./controllers/blogPostsController");
const contactsController = require("./controllers/contactsController");
const errorController = require("./controllers/errorController");

// App Settings
app.set("port", process.env.PORT || 3000);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "public")));
app.use(layouts);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Database Connection
mongoose.connect(
    "mongodb://localhost:27017",  // Replace with Atlas connection string
    { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false }
  );

// Home routes
app.get("/", homeController.home);
app.get("/about", homeController.about);

// Style routes
app.get("/gallery", stylesController.showAllStyles);
app.get("/style/:id", stylesController.showStyle);

// Blog routes
app.get("/blog", blogPostsController.showAllPosts);
app.get("/blog/:id", blogPostsController.showPost);

// Contact routes
app.get("/contacts/new", contactsController.newContact);
app.post("/contacts/create", contactsController.createContact);
app.get("/contacts", contactsController.getUnrespondedContacts);
app.get("/contacts/:id/edit", contactsController.getContactById);
app.post("/contacts/:id/update", contactsController.updateContactById);

// Error routes
app.use(errorController.handleErrors);

 
// Start server
app.listen(app.get("port"), () => {
    console.log(`Server running at http://localhost:${app.get("port")}`);
  });