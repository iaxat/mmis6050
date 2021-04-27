"use strict";

const router = require("express").Router(),
 adminController = require("../controllers/adminController");

router.get("/", adminController.index);
router.get("/sell",adminController.sell);
router.post("/create",adminController.create,adminController.redirectView);

module.exports = router;