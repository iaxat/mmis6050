// Question 8
// Reference from other controllers made in this exam

// Derived from styleController.js
// Question 7

"use strict";

const { response } = require("express");
const contacts = require("../models/contacts");
const nodemailer = require("nodemailer");

module.exports = {
  
// renders form for contact request
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

  // puts contact request data in contact schema and redirects to email sender when successful 
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
    }).catch(error=>{
      next(error);
    });
  },
  thanks:(req,res,next)=>{
    res.render("thanks");
  },

// fetches contact request list

  list:(req,res,next) =>{

    contacts.find({dateResponded: null}).then(lists=>{
    res.locals.lists=lists;
    next(); 
    }).catch(error=>{
      next(error);
    });
  },
  listView:(req,res)=>{
    res.render("contact-list");
  },

  // shows specific contact request
  edit: (req, res) => {
    let Id = req.params.id;
    contacts.findById(Id)
      .then(response => {
        res.render("contact-respond", {
          response: response
        });
      }).catch(error=>{
        next(error);
      });
  },
  //  records response by admin
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
      }).catch(error=>{
        next(error);
      });
  },


  // Q 10  - Nodemailer used:
  // for nodemailer:
  // resources used:
  // https://www.geeksforgeeks.org/how-to-send-attachments-and-email-using-nodemailer-in-node-js/
  // https://stackoverflow.com/questions/38024428/error-connect-econnrefused-127-0-0-1465-nodemailer
  // https://www.geeksforgeeks.org/how-to-send-email-with-nodemailer-using-gmail-account-in-node-js/
  // https://www.codegrepper.com/code-examples/javascript/nodemailer+step+by+step+example
  // mail used - mail.com

  // sends email to admin updating about a contact request
  mail:(req,res,next)=>{
    var smtpConfig = {
      host: 'smtp.mail.com',
      port: 465,
      secure: true,
      auth: {
          // user: 'removed the credentials',
          // pass: 'removed credentials'
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
