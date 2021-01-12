// Question 8

// Question 7 - Schema

"use strict";

const mongoose = require("mongoose"),
  { Schema } = mongoose;

var contactSchema = new Schema(
    {
        title : {
            type: String,
            required: true,
            max: 30
        },

        summary: {
            type: String,
            required: true,
            max: 250
        },

        content: {
            type: String,
            required: true
        },
        
        imageUrl: {
            type: String,
            required: true,
            allowedFormats: ["jpg","png"]

        },

        datePosted: {
            type: Date,
            required: true
        }

    }
);

module.exports = mongoose.model("blogPost", blogSchema);

