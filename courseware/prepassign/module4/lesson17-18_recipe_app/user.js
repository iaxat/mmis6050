
mongoose.connect(
    "mongodb+srv://axat:axat123@cluster0.y9onm.mongodb.net/recipe_db?retryWrites=true&w=majority",
    {useNewUrlParser: true}, {useCreatedIndex: true}
  );
  User = require ("./models/user")
  mongoose.Promise = global.Promise;



const mongoose = require("mongoose"),
  {Schema} = mongoose,







  userSchema = new Schema({
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
  zipCode: {
    type: Number,
    min: [1000, "Zip code too short"],
    max: 99999
  },
  password: {
    type: String,
    required: true
  },
  courses: [{type: Schema.Types.ObjectId, ref: "Course"}],
  subscribedAccount: {type: Schema.Types.ObjectId, ref:
 "Subscriber"}
}, {
  timestamps: true
});


// 18.6
var testUser;
User.create({
  name: {
    first: "Jon",
    last: "Wexler"
  },
  email: "jon@jonwexler.com",
  password: "pass123"
})
  .then(user => testUser = user)
  .catch(error => console.log(error.message));


userSchema.virtual("fullName")
  .get(function() {
    return `${this.name.first} ${this.name.last}`;
  });

module.exports = mongoose.model("User", userSchema);

var targetSubscriber;
Subscriber.findOne({
    email: testUser.email
  })
  .then(subscriber => targetSubscriber = subscriber);
