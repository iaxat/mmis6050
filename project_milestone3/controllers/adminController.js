"use strict";

const Product = require("../models/product");

module.exports = {

  index: (req, res) => {
    res.render("admin");
  },


  sell:(req,res)=>{
      res.render("sell");
  },
  create: (req, res, next) => {

    let fileName=req.files.sampleFile;
    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).send('No files were uploaded.');
    }
    fileName.mv('public/images/' + fileName.name, function (err) {
      if (err)
        return res.status(500).send(err);
    });

    console.log(fileName.name)

    let productParams = {
      productName: req.body.productName,
      description: req.body.description,
      price: req.body.price,
      imageUrl: fileName.name,
    };  
    Product.create(productParams)
      .then(product => {
        res.locals.redirect = "/shop";
        res.locals.product = product;
        next();
      })
      .catch(error => {
        console.log(`Error saving course: ${error.message}`);
        next(error);
      });
  },

  
  redirectView: (req, res, next) => {
    let redirectPath = res.locals.redirect;
    if (redirectPath) res.redirect(redirectPath);
    else next();
  },
};