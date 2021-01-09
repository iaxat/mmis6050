// The main.js file section 'g'

"use strict";

const express = require("express"),
    app = express(),
    router = express.Router(),
    layouts = require("express-ejs-layouts"),
    methodOverride = require("method-override"),
    mongoose = require("mongoose"),
    homeController = require("./controllers/homeController");



mongoose.connect(
    "mongodb+srv://axat:<password>@cluster0.y9onm.mongodb.net/akshat?retryWrites=true&w=majority",
    { useNewUrlParser: true ,useCreateIndex:true}
    );
    mongoose.set("useCreateIndex", true);


app.set("port", process.env.PORT || 3000);
app.set("view engine", "ejs");

router.use(
    methodOverride("_method", {
    methods: ["POST", "GET"]
    })
);


router.use(layouts);
router.use(express.static("public"));

router.use(
    express.urlencoded({
    extended: false
    })
);
router.use(express.json());



// created
router.get("/", homeController.index);
router.get("/about", homeController.about);


app.use("/", router);



app.listen(app.get("port"), () => {
  console.log(`Server running at http://localhost:${app.get("port")}`);
});
