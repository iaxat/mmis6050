"use strict";

const mongoose = require("mongoose"),
  { Schema } = mongoose,
  bcrypt = require("bcrypt"),
  passportLocalMongoose = require("passport-local-mongoose"),
  randToken = require("rand-token"),
  userSchema = new Schema(
    {
      name: {
        first: {
          type: String,
          trim: true
        },
        last: {
          type: String,
          trim: true
        }
      },
      email: {
        type: String,
        required: true,
        lowercase: true,
        unique: true
      },
      // apiToken: {
      //   type: String
      // },
      zipCode: {
        type: Number,
        min: [1000, "Zip code too short"],
        max: 99999
      },
    },
  );


userSchema.plugin(passportLocalMongoose, {
  usernameField: "email"
});

module.exports = mongoose.model("User", userSchema);
