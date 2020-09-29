// home_controller

const homeController = require("./controllers/homeController");

// port
const port = 3000,

  express = require("express"),
  
  app = express();

  // callback
  app.use((req, res, next) => {
    console.log(`request made to: ${req.url}`);
    next();
  });

  app.use(
    express.urlencoded({
      extended: false
    })
  );
  
  app.use(express.json());

  app.get("/items/:vegetable", homeController.sendReqParam);

  app.get("/", homeController.sendReqParam_test);

  app.post("/", (req, res) => {
    console.log(req.body);
    console.log(req.query);
    res.send("POST Successful!");
  });

  // listen
app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});