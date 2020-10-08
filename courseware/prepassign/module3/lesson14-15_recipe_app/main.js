const mongoose = require("mongoose");
mongoose.connect(
  "mongodb+srv://axat:axat123@cluster0.y9onm.mongodb.net/recipe_db?retryWrites=true&w=majority",
  {useNewUrlParser: true, useUnifiedTopology: true}
);
const db = mongoose.connection;
db.once("open", () => {
  console.log("Successfully connected to MongoDB using Mongoose!");
});


import mongoose from 'mongoose';
const { Schema } = mongoose;

const subscriberSchema = mongoose.Schema({
  name: String,
  email: String,
  zipCode: Number
});

const Subscriber = mongoose.Schema({
  name: String,
  email: String,
  zipCode: Number
})

const Subscriber = mongoose.model(Subscriber, subscriberSchema)

var subscriber1 = new Subscriber({
  name: "Jon Wexler",
  email: "jon@jonwexler.com"
});                                              1

subscriber1.save((error, savedDocument) => {     2
  if (error) console.log(error);                 3
  console.log(savedDocument);                    4
});

Subscriber.create(
  {
    name: "Jon Wexler",
    email: "jon@jonwexler.com"
  },
  function (error, savedDocument) {              5
    if (error) console.log(error);
    console.log(savedDocument);
  }
);