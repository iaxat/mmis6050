const mongoose = require("mongoose"),

  Subscriber = require("./models/subscriber");

mongoose.connect(
  "mongodb+srv://axat:axat123@cluster0.y9onm.mongodb.net/recipe_db?retryWrites=true&w=majority",
  {useNewUrlParser: true}, {useCreatedIndex: true}
);

mongoose.Promise = global.Promise;