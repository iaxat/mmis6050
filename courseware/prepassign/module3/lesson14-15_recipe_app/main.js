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