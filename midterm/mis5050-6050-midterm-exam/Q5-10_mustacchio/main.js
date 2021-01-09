// The main.js file section g

"use strict";

const express = require("express"),
    app = express(),
    router = express.Router(),
    layouts = require("express-ejs-layouts"),
    methodOverride = require("method-override"),
    homeController = require("./controllers/homeController")
    ;



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
