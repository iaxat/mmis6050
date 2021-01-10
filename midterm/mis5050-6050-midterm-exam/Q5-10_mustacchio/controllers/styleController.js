"use strict";

const Mustache = require("../models/mustache");

module.exports = {
  
  new: (req, res) => {
    res.render("courses/new");
  },

  create: (req, res, next) => {
      console.log("inside");
    let styleParams = {
      title: req.body.title,
      description: req.body.description,
      imageUrl: req.body.imageUrl,
    //   items: [req.body.items.split(",")],
    //   zipCode: req.body.zipCode
    };
    Mustache.create(styleParams)
      .then(course => {
        res.locals.redirect = "/";
        // res.locals.course = course;
        next();
      })
      .catch(error => {
        console.log(`Error saving course: ${error.message}`);
        next(error);
      });
  },
  new: (req, res) => {
    res.render("new");
  },


  redirectView: (req, res, next) => {
    let redirectPath = res.locals.redirect;
    if (redirectPath !== undefined) res.redirect(redirectPath);
    else next();
  }
};
