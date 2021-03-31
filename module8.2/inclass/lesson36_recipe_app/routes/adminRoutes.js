"use strict";

const router = require("express").Router(),
  adminController = require("../controllers/coursesController"),
  usersController = require("../controllers/usersController");



// add routes


router.use(usersController.verifyAdmin);


router.get("/users", adminController.showUsers);

module.exports = router;