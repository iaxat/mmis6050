// Question 8
// Reference from other controllers made in this exam

// Derived from styleController.js
// Question 7

"use strict";

const contacts = require("../models/contacts");

module.exports = {
  
  index: (req, res) => {
    res.render("contacts");
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
    res.render("views/contacts");
  }
};
