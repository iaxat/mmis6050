// Question 8

// Question 7 - Schema

"use strict";

// const { strict } = require("assert");
// const { stringify } = require("querystring");

const validator=require('validator');

const mongoose = require("mongoose"),
  { Schema } = mongoose;
  
var contactsSchema = new Schema(
    {
        name : {
            type: String,
            required: true,
            max: 30
        },

        address: {
            type: String
        },
        
        phone: {
            type: String,

        },

        message: {
            type: String,
            required: true
        },

        datePosted: {
            type: Date,
            required: true
        },

        response: {
            type: String,
        },

        dateResponded: {
            type: Date,
        },
        // https://stackoverflow.com/questions/18022365/mongoose-validate-email-syntax/28396238#28396238
        email:{
            type:String,
            validate:{
                  validator: validator.isEmail,
                  message: '{VALUE} is not a valid email',
                  isAsync: false
                }
            }
    }
);

contactsSchema.virtual("shortMessage")
  .get(function() {
      let str=this.message.slice(0, 10);
    return str;
  });   

module.exports = mongoose.model("con", contactsSchema);
