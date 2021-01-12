// Question 8

// Question 7 - Schema

"use strict";

const mongoose = require("mongoose"),
  { Schema } = mongoose;

var contactSchema = new Schema(
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
        },
        
        phone: {
            type: String,
            required: true,
            allowedFormats: ["jpg","png"]

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
            type: Date,
            required: true
        },

        dateResponded: {
            type: Date,
            required: true
        },

        shortMessage: {
            type: Date,
            required: true
        }

    }
);

module.exports = mongoose.model("con", contactSchema);
