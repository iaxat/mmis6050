"use strict";

const express = require("express"),
  layouts = require("express-ejs-layouts"),
  app = express(),
  router = express.Router(),
  mongoose = require("mongoose"),
  methodOverride = require("method-override");

  mongoose.Promise=global.Promise;

  mongoose.connect(
  "mongodb+srv://root:root@akshat.y9onm.mongodb.net/asdf?retryWrites=true&w=majority",
  { useNewUrlParser: true ,useCreateIndex:true} /*advice by terminal for depricated method*/
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

app.use("/", router);

app.listen(app.get("port"), () => {
  console.log(`Server running at http://localhost:${app.get("port")}`);
});
