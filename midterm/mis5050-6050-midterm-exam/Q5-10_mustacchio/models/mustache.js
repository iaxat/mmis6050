"use strict";

const mongoose = require("mongoose"),
  { Schema } = mongoose;

var mustacheSchema = new Schema(
    {
        title : {
            type: String,
            required: true,
            max: 30
        },

        imageUrl: {
            type: String,
            required: true,
            // allowedFormats: ["jpg","png"],
        },

        description: {
            type: String,
            required: true
        }
    }
);

module.exports = mongoose.model("Mustache", mustacheSchema);