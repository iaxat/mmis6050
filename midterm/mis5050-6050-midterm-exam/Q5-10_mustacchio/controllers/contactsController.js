// Question 8
// Reference from other controllers made in this exam

// Derived from styleController.js
// Question 7

"use strict";

const { response } = require("express");
const contacts = require("../models/contacts");
const nodemailer = require("nodemailer");

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
      // res.locals.redirect = "/thanks";

      next();
    })
  },
  thanks:(req,res,next)=>{
    res.render("thanks");
  },
  list:(req,res,next) =>{
    console.log("kbjshb");

    contacts.find({dateResponded: null}).then(lists=>{
    res.locals.lists=lists;
    next(); 
    })
  },
  listView:(req,res)=>{
    res.render("contact-list");
  },

  edit: (req, res) => {
    let Id = req.params.id;
    contacts.findById(Id)
      .then(response => {
        res.render("contact-respond", {
          response: response
        });
      })
  },
  update:(req,res,next)=>{
    console.log(req.body.response);
    let Id = req.body.id;
    console.log(Id)
    // console.log(typeof(req.body.response));
    contacts.findByIdAndUpdate(Id, { $set: { dateResponded: Date.now(), response: req.body.response}   } )
      .then(response => {
        res.render("contact-respond", {
          response: response
        });
      })
  },

  // for nodemailer:
  // resources used:
  // https://stackoverflow.com/questions/38024428/error-connect-econnrefused-127-0-0-1465-nodemailer
  // mail used - mail.com

  mail:(req,res,next)=>{
    var smtpConfig = {
      host: 'smtp.mail.com',
      port: 465,
      secure: true, // use SSL
      auth: {
          user: 'test6050@mail.com',
          pass: 'test6050@123'
      }
  };
    var sender = nodemailer.createTransport(smtpConfig); 
      
    var mail = { 
      from: "test6050@mail.com", 
      to: "narazamsa@gmail.com", 
      subject: "Sending Email Node.js", 
      text: "New text mail service test"
    }; 
      
    sender.sendMail(mail, function(error, info) { 
      if (error) { 
        console.log(error); 
        
      } else { 
        console.log("Email sent successfully: " + info.response); 
        res.locals.redirect = "/thanks";
      } 
      next();
    });  
  }


};
