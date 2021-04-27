"use strict";

const Product = require("../models/product");

module.exports = {
  index: (req, res,next) => {
    Product.find()
    .then(products => {
      res.locals.products = products;
      next();
    })
    .catch(error => {
      console.log(`Error fetching users: ${error.message}`);
      next(error);
    });
  },
  indexView: (req, res) => {
    res.render("shop");
  },

};
