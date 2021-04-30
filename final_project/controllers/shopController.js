"use strict";

const Product = require("../models/product");
const User = require("../models/user");

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
  singleProduct:(req,res,next) =>{
    let id=req.params.id;
    Product.findById(id)
    .then(products => {
      res.locals.product = products;
      next();
    })
    .catch(error => {
      console.log(`Error fetching users: ${error.message}`);
      next(error);
    });
  },
  singleView: (req, res) => {
    res.render("single-product");
  },
  addCart:(req,res,next)=>{
    let id=req.params.id;
    if(req.user){
      try{
        User.findByIdAndUpdate(req.user._id,{$addToSet:{cart:[id]}}).then(cart=>{
          res.locals.redirect="/shop/showCart";
          next();
        })
      }catch(error){
        next(error);
      }
    }else{
      res.send("login first")
    }
  },
  showCart: async (req,res) =>{
    if(req.user){
      try{
        let cartId=await User.findById(req.user._id,"cart").populate("cart");
        res.render("cart",{products:cartId.cart});
      }catch(error){
        console.log(error);
      }
    }else{
      res.send("login first")
    }
  },
  redirectView: (req, res, next) => {
    let redirectPath = res.locals.redirect;
    if (redirectPath) res.redirect(redirectPath);
    else next();
  },
};