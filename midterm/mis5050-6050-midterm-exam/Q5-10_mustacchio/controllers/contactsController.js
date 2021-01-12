// Question 8
// Reference from other controllers made in this exam

// Derived from styleController.js
// Question 7

"use strict";

const contact = require("../models/contact");

module.exports = {
  
  index: (req, res, next) => {
    contact.find()
      .then(styles => {
        res.locals.styles = styles;
        next();
      })
      .catch(error => {
        console.log(`Error fetching contact: ${error.message}`);
        next(error);
      });
  },
  indexView: (req, res) => {
    res.render("contact");
  },

  redirectView: (req, res, next) => {
    let redirectPath = res.locals.redirect;
    if (redirectPath !== undefined) res.redirect(redirectPath);
    else next();
  },


  styleid: (req,res,next) => {
    let id=req.params.id;
    contact.findById(id)
      .then(styles => {
        res.locals.styleid =styles ;
        next();
      })
      .catch(error => {
        console.log('Error fetching contact: ${error.message}');
        next(error);
      });
  },
  
  styleidView: (req,res) => {
    res.render("views/contact");
  }
};
