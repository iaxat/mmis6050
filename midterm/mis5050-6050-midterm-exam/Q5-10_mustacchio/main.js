// The main.js
// The questions 5 to 10 ar solved in this section
// Resources used: online, class lectures, in class assignments

"use strict";

const express = require("express"),
    app = express(),
    router = express.Router(),
    layouts = require("express-ejs-layouts"),
    methodOverride = require("method-override"),
    mongoose = require("mongoose"),
    homeController = require("./controllers/homeController"),
    styleController = require("./controllers/styleController");


mongoose.Promise=global.Promise;

mongoose.connect(
"mongodb+srv://root:root@akshat.y9onm.mongodb.net/qwer?retryWrites=true&w=majority",
{ useNewUrlParser: true, useCreateIndex:true, useUnifiedTopology: true} /*advice by terminal for depricated method*/
);


const db=mongoose.connection;

db.once("open",()=>{
console.log("database connected");
})



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

// router.get("/newStyle",styleController.new);
// router.post("/create",styleController.create, styleController.redirectView);

router.get("/styles",styleController.index,styleController.indexView);


app.use("/", router);



app.listen(app.get("port"), () => {
  console.log(`Server running at http://localhost:${app.get("port")}`);
});

