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
            // allowedFormats: ["jpg","png"],
        },

        content: {
            type: String,
            required: true
        },
        
        imageUrl: {
            
            
        },

        datePosted: {


        }

    }
);

module.exports = mongoose.model("Mustache", mustacheSchema);