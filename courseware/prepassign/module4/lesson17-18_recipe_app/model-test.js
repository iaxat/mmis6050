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



  const mongoose = require("mongoose"),
  Subscriber = require("./models/subscriber"),
  Course = require("./models/course");

var testCourse,
  testSubscriber;

mongoose.connect(
  "mongodb://localhost:27017/recipe_db",
  {useNewUrlParser: true}
);

mongoose.Promise = global.Promise;

Subscriber.remove({})                                              1
  .then((items) => console.log(`Removed ${items.n} records!`))
  .then(() => {
    return Course.remove({});
  })
  .then((items) => console.log(`Removed ${items.n} records!`))
  .then(() => {                                                    2
      return Subscriber.create( {
        name: "Jon",
        email: "jon@jonwexler.com",
        zipCode: "12345"
      });
  })
  .then(subscriber => {
    console.log(`Created Subscriber: ${subscriber.getInfo()}`);
  })
  .then(() => {
    return Subscriber.findOne( {
      name: "Jon"
    });
  })
  .then(subscriber => {
    testSubscriber = subscriber;
    console.log(`Found one subscriber: ${ subscriber.getInfo()}`);
  })
  .then(() => {                                                    3
      return Course.create({
        title: "Tomato Land",
        description: "Locally farmed tomatoes only",
        zipCode: 12345,
        items: ["cherry", "heirloom"]
      });
  })
  .then(course => {
    testCourse = course;
    console.log(`Created course: ${course.title}`);
  })
  .then(() => {                                                    4
      testSubscriber.courses.push(testCourse);
    testSubscriber.save();
  })
  .then( () => {                                                   5
      return Subscriber.populate(testSubscriber, "courses");
  })
  .then(subscriber => console.log(subscriber))
  .then(() => {                                                    6
      return Subscriber.find({ courses: mongoose.Types.ObjectId(
 testCourse._id) });
  })
  .then(subscriber => console.log(subscriber));