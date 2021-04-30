"use strict";

const router = require("express").Router(),
 shopController = require("../controllers/shopController");

router.get("/", shopController.index,shopController.indexView);
router.get("/singleProduct/:id",shopController.singleProduct,shopController.singleView);
router.get("/cart/:id", shopController.addCart,shopController.redirectView);
router.get("/showCart",shopController.showCart);

module.exports = router;