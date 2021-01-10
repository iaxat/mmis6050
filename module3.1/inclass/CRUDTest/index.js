// This file uses SQLite and includes all CRUD operations embedded in route handlers  

const express = require("express");
const path = require("path");
const sqlite3 = require("sqlite3").verbose();

// Create express server
const app = express();

// Configure server
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: false }));

// Connect to SQLite database
const db_name = path.join(__dirname, "data", "crud-test.db");
const db = new sqlite3.Database(db_name, err => {
  if (err) {
    return console.error(err.message);
  }
  console.log("Connection to database 'crud-test.db' successful");
});

// Create table Books (_id, Title, Author, Comment)
const sql_create = `CREATE TABLE IF NOT EXISTS Books (
  _id INTEGER PRIMARY KEY AUTOINCREMENT,
  Title VARCHAR(100) NOT NULL,
  Author VARCHAR(100) NOT NULL,
  Comment TEXT
);`;
db.run(sql_create, err => {
  if (err) {
    return console.error(err.message);
  }
  console.log("Creation of 'Books' table successful");
  
  // Populate the table
  const sql_insert = `INSERT INTO Books (_id, Title, Author, Comment) VALUES
  (1, 'Mrs. Bridge', 'Evan S. Connell', 'First in the series'),
  (2, 'Mr. Bridge', 'Evan S. Connell', 'Second in the series'),
  (3, 'The Count of Monte Cristo', 'Alexandre Dumas', 'The story of Edmond Dantès');`;
  db.run(sql_insert, err => {
    if (err) {
      return console.error(err.message);
    }
    console.log("Data inserted into 'Books' table");
  });
});

// Start the Express server
app.listen(3000, () => {
    console.log("Server running at (http://localhost:3000/) !");
});

//*************** Routes ******************* */

// GET /
// Show index view
app.get("/", (req, res) => {
  // res.send("Hello world!...");
  res.render("index");
});

// GET /about
// Show about view
app.get("/about", (req, res) => {
  res.render("about");
});

// GET /data
app.get("/data", (req, res) => {
  const test = {
    title: "Test",
    items: ["one", "two", "three"]
  };
  res.render("data", { model: test });
});

// GET /books
app.get("/books", (req, res) => {
  const sql = "SELECT * FROM Books ORDER BY Title";
  db.all(sql, [], (err, rows) => {
    if (err) {
      return console.error(err.message);
    }
    res.render("books", { model: rows });
  });
});

// GET /create
app.get("/create", (req, res) => {
  res.render("create", { model: {} });
});

// POST /create
app.post("/create", (req, res) => {
  const sql = "INSERT INTO Books (Title, Author, Comment) VALUES (?, ?, ?)";
  const book = [req.body.Title, req.body.Author, req.body.Comment];
  db.run(sql, book, err => {
    if (err) {
      return console.error(err.message);
    }
    res.redirect("/books");
  });
});

// GET /edit/5
app.get("/edit/:id", (req, res) => {
  const id = req.params.id;
  const sql = "SELECT * FROM Books WHERE _id = ?";
  db.get(sql, id, (err, row) => {
    if (err) {
      return console.error(err.message);
    }
    res.render("edit", { model: row });
  });
});

// POST /edit/5
app.post("/edit/:id", (req, res) => {
  const id = req.params.id;
  const book = [req.body.Title, req.body.Author, req.body.Comment, id];
  const sql = "UPDATE Books SET Title = ?, Author = ?, Comment = ? WHERE (_id = ?)";
  db.run(sql, book, err => {
    if (err) {
      return console.error(err.message);
    }
    res.redirect("/books");
  });
});

// GET /delete/5
app.get("/delete/:id", (req, res) => {
  const id = req.params.id;
  const sql = "SELECT * FROM Books WHERE _id = ?";
  db.get(sql, id, (err, row) => {
    if (err) {
      return console.error(err.message);
    }
    res.render("delete", { model: row });
  });
});

// POST /delete/5
app.post("/delete/:id", (req, res) => {
  const id = req.params.id;
  const sql = "DELETE FROM Books WHERE _id = ?";
  db.run(sql, id, err => {
    if (err) {
      return console.error(err.message);
    }
    res.redirect("/books");
  });
});
