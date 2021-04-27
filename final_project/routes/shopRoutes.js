"use strict";

const router = require("express").Router(),
 shopController = require("../controllers/shopController");

router.get("/", shopController.index,shopController.indexView);

module.exports = router;