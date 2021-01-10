// This version of index offloads CRUD operations to a controller.
// The data store will change depending on which controller is imported.
// To use SQLite, import bookControllerSqlite
// To use MongoDB, import bookControllerMongoDB

const express = require("express");
const path = require("path");
const homeController = require("./controllers/homeController");

// Uncomment the following line to use SQLite
const bookController = require("./controllers/bookControllerSqlite");

// Uncomment the following line to use MongoDB
//const bookController = require("./controllers/bookControllerMongoDB");

// Create express server
const app = express();

// Configure server
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: false }));


// Start the Express server
app.listen(3000, () => {
    console.log("Server running at (http://localhost:3000/) !");
});

//*************** Routes ******************* */

// GET /
app.get("/", homeController.renderHome);

// GET /about
app.get("/about", homeController.renderAbout);

// GET /data
app.get("/data", homeController.renderData);

// GET /books
app.get("/books", bookController.getBooks);

// GET /create
app.get("/create", bookController.newBook);

// POST /create
app.post("/create", bookController.insertBook);

// GET /edit/5
app.get("/edit/:id", bookController.editBook);

// POST /edit/5
app.post("/edit/:id", bookController.updateBook);

// GET /delete/5
app.get("/delete/:id", bookController.selectForDelete);

// POST /delete/5
app.post("/delete/:id", bookController.deleteBook);
