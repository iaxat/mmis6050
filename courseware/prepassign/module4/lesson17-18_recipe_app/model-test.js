const mongoose = require("mongoose"),

  Subscriber = require("./models/subscriber");

mongoose.connect(
  "mongodb+srv://axat:axat123@cluster0.y9onm.mongodb.net/recipe_db?retryWrites=true&w=majority",
  {useNewUrlParser: true}, {useCreatedIndex: true}
);

mongoose.Promise = global.Promise;


Subscriber.create({
    name: "Jon",
    email: "jon@jonwexler.com",
    zipCode: "12345"
  })
    .then(subscriber => console.log(subscriber))
    .catch(error => console.log(error.message));       1
  
  var subscriber;                                      2
  Subscriber.findOne({
    name: "Jon"
  }).then(result => {
    subscriber = result;                               3
    console.log(subscriber.getInfo());                 4
  });



