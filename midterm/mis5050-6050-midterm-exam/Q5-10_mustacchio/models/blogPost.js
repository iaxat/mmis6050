// Question 7 - Schema

"use strict";

const mongoose = require("mongoose"),
  { Schema } = mongoose;

var blogSchema = new Schema(
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
            match: /^.*\.(jpg|JPG|png|PNG)$/,

        },

        datePosted: {
            type: Date,
            required: true
        }

    }
);

module.exports = mongoose.model("blogPost", blogSchema);

