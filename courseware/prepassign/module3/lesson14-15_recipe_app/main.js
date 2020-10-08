const mongoose = require("mongoose");
mongoose.connect(
  "mongodb+srv://axat:axat123@cluster0.y9onm.mongodb.net/recipe_db?retryWrites=true&w=majority",
  {useNewUrlParser: true}
);
const db = mongoose.connection;

db.once("open", () => {
  console.log("Successfully connected to MongoDB using Mongoose!");
});

