// Question 6
// Reference from Module 5.2 In Class Exercise

"use strict";

const Mustache = require("../models/mustache");

module.exports = {
  
  // fetches data of all styles from Mustache schema
  index: (req, res, next) => {
    Mustache.find()
      .then(styles => {
        res.locals.styles = styles;
        next();
      })
      .catch(error => {
        console.log(`Error fetching users: ${error.message}`);
        next(error);
      });
  },
  indexView: (req, res) => {
    res.render("styles/gallery");
  },

  redirectView: (req, res, next) => {
    let redirectPath = res.locals.redirect;
    if (redirectPath !== undefined) res.redirect(redirectPath);
    else next();
  },

// fetching individual style
  styleid: (req,res,next) => {
    let id=req.params.id;
    Mustache.findById(id)
      .then(styles => {
        res.locals.styleid =styles ;
        next();
      })
      .catch(error => {
        console.log('Error fetching styles: ${error.message}');
        next(error);
      });
  },
  
  styleidView: (req,res) => {
    res.render("styles/gallery-single-post.ejs");
  }
};
