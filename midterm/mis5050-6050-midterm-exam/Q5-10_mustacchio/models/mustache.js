"use strict";

const mongoose = require("mongoose"),
  { Schema } = mongoose;

var mustacheSchema = new Schema(
    {
        title : {
            type: String,
            required: true
        },

        imageUrl: {
            type: String,
            required: true
        },

        description: {
            type: String,
            required: true
        }
    }
)