// Question 8
// Reference from other controllers made in this exam

// Derived from styleController.js
// Question 7

"use strict";

const contacts = require("../models/contacts");

module.exports = {
  
  index: (req, res) => {
    res.render("contact");
  },

  redirectView: (req, res, next) => {
    let redirectPath = res.locals.redirect;
    if (redirectPath !== undefined) res.redirect(redirectPath);
    else next();
  },


  styleid: (req,res,next) => {
    let id=req.params.id;
    contacts.findById(id)
      .then(styles => {
        res.locals.styleid =styles ;
        next();
      })
      .catch(error => {
        console.log('Error fetching contacts: ${error.message}');
        next(error);
      });
  },
  
  styleidView: (req,res) => {
    res.render("contacts");
  },

  create: (req,res,next)=>{
    let contactParams = {
      name: req.body.name,
      address: req.body.address,
      email: req.body.email,
      phone: req.body.phone,
      message: req.body.message,
      datePosted: Date.now()
    };
    contacts.create(contactParams).then(contact => {
      res.locals.redirect = "/thanks";
      next();
    })
  },
  thanks:(req,res,next)=>{
    res.render("thanks");
  },
  list:(req,res,next) =>{
    console.log("kbjshb");
    contacts.find({datePosted: null}).then(lists=>{
    res.locals.lists=lists;
    next(); 
    })
  },
  listView:(req,res)=>{
    res.render("contact-list");
  }
};
