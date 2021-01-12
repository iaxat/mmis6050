"use strict";

const Mustache = require("../models/mustache");

module.exports = {
  
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
  }
};
