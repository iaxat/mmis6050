"use strict"; 

// Import required libraries

const port = 3000,
  express = require("express"),
  app = express(),
  homeController = require("./controllers/homeController");


  // define middleware function
  const step1 = (req,res,next) => {
    console.log("Doing step 1");
    next();
  }

  const step2 = (req,res,next) => {
    console.log("Doing step 3");
    next();
  }

  // Import built-in middleware for handling request bodies in urlencoded or JSON format
  app.use(express.urlencoded({extended:false}));
  app.use(express.json());

  // Tell the app to use the logRequestPaths function of the homeController as middleware
  app.use(homeController.logRequestPaths);
  app.use(step1);
  app.use("/",step2);


  // Get route
  app.get("/",step2 ,homeController.getHome);

  app.get("/items/:vegetable", homeController.sendReqParam);


  // Post Route
  app.post("/", homeController.handlePosts);

  // Start app on port 3000
  app.listen(port, () => {
      console.log(`Server running on port ${port}`);
  });