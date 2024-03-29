"use strict";

const blogPost = require("../models/blogPost");

module.exports = {
  
  // fetching all styles from blogpost

  index: (req, res, next) => {
    blogPost.find()
      .then(styles => {
        res.locals.styles = styles;
        next();
      })
      .catch(error => {
        console.log(`Error fetching blog post: ${error.message}`);
        next(error);
      });
  },
  indexView: (req, res) => {
    res.render("blog");
  },

  redirectView: (req, res, next) => {
    let redirectPath = res.locals.redirect;
    if (redirectPath !== undefined) res.redirect(redirectPath);
    else next();
  },

  // fetching individual style from blog

  styleid: (req,res,next) => {
    let id=req.params.id;
    blogPost.findById(id)
      .then(styles => {
        res.locals.styleid =styles ;
        next();
      })
      .catch(error => {
        console.log('Error fetching blog post: ${error.message}');
        next(error);
      });
  },
  
  styleidView: (req,res) => {
    res.render("blog-single-post");
  }
};
