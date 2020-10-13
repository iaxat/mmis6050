var testUser;
User.create({
  name: {
    first: "Jon",
    last: "Wexler "
  },
  email: "jon@jonwexler.com",
  password: "pass123"
})
  .then(user => {
    testUser = user;
    return Subscriber.findOne({
      email: user.email
    });
  })
  .then(subscriber => {
    testUser.subscribedAccount = subscriber;
      testUser.save().then(user => console.log("user updated"));
  })
  .catch(error => console.log(error.message));