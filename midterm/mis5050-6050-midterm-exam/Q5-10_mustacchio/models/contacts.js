// Question 8

// Question 7 - Schema

"use strict";

const { strict } = require("assert");
const { stringify } = require("querystring");

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

        email: {
            type: String,
            required: true,
            // format validation
        },
        
        phone: {
            type: String,

        },

        message: {
            type: Date,
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
        }

        // shortMessage: {
            // type: mongoose.VirtualType,
        //     // return 10 word message
        // }

    }
);

module.exports = mongoose.model("con", contactsSchema);
