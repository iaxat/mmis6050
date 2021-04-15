"use strict";

const express = require("express"),
  app = express(),
  layouts = require("express-ejs-layouts"),
  mongoose = require("mongoose"),
  path = require("path"),
  fileUpload = require('express-fileupload'),
  connectFlash = require("connect-flash"),
  expresssession=require('express-session'),
  cookieParser=require("cookie-parser"),
  User=require("./models/user")
  ;

// Controllers
const homeController = require("./controllers/homeController");
const stylesController = require("./controllers/stylesController");
const blogPostsController = require("./controllers/blogPostsController");
const contactsController = require("./controllers/contactsController");
const userController = require("./controllers/userController");
const errorController = require("./controllers/errorController");
const passport = require("passport");

// App Settings
app.set("port", process.env.PORT || 3000);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "public")));
app.use(layouts);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(connectFlash());


app.use(fileUpload());

app.use(cookieParser("secret_passcode"));

app.use(expresssession({
  secret: "secret_passcode",
  cookie:{
    maxAge: 40000
  },
  resave: false,
  saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req,res,next)=>{
  res.locals.loggedIn=req.isAuthenticated();
  res.locals.currentUser= req.user;
  res.locals.flashMessages = req.flash();
  next();
})

// Database Connection
mongoose.connect(
  "mongodb+srv://root:root@akshat.y9onm.mongodb.net/final-exam?retryWrites=true&w=majority",  // Replace with Atlas connection string
    { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false }
  );

// Home routes
app.get("/", homeController.home);
app.get("/about", homeController.about);

// User routes
app.get("/login",userController.login);
app.post("/login", userController.authenticate,userController.redirectView);
app.get("/register",userController.register);
app.post("/users/create",userController.create,userController.redirectView);
app.get("/logout",userController.logout,userController.redirectView);

// Style routes
app.get("/gallery", stylesController.showAllStyles);
app.get("/style/:id", stylesController.showStyle);
app.get("/addStyle",stylesController.addStyle);
app.post("/style/upload",stylesController.uploadImage,stylesController.showAllStyles);

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