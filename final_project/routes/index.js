"use strict";

const router = require("express").Router(),
  errorRoutes = require("./errorRoutes"),
  userRoutes = require("./userRoutes"),
  homeRoutes = require("./homeRoutes"),
  adminRoutes=require("./adminRoutes"),
  apiRoutes=require("./apiRoutes"),
  shopRoutes=require("./shopRoutes");

  router.use("/users", userRoutes);
  router.use("/shop",shopRoutes);
  router.use("/api",apiRoutes);
  router.use("/admin",adminRoutes);
  router.use("/", homeRoutes);
router.use("/", errorRoutes);

module.exports = router;