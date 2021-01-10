// This module handles routes related to books and performs CRUD operations using SQLite

const sqlite3 = require("sqlite3").verbose();
const path = require("path");

// Connect to SQLite database
const db_name = path.join(__dirname, "../data", "crud-test2.db");
const db = new sqlite3.Database(db_name, err => {
  if (err) {
    return console.error(err.message);
  }
  console.log("Connection to database 'crud-test2.db' successful");
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

// Retrieve all books
exports.getBooks = (req, res) => {
    const sql = "SELECT * FROM Books ORDER BY Title";
    db.all(sql, [], (err, rows) => {
      if (err) {
        return console.error(err.message);
      }
      res.render("books", { model: rows });
    });
  };

  // Render the view to insert a new book
  exports.newBook = (req, res) => {
    res.render("create", { model: {} });
  };

  // Insert a new book
  exports.insertBook = (req, res) => {
    const sql = "INSERT INTO Books (Title, Author, Comment) VALUES (?, ?, ?)";
    const book = [req.body.Title, req.body.Author, req.body.Comment];
    db.run(sql, book, err => {
      if (err) {
        return console.error(err.message);
      }
      res.redirect("/books");
    });
  };

  // Render the view to edit a book
  exports.editBook = (req, res) => {
    const id = req.params.id;
    const sql = "SELECT * FROM Books WHERE _id = ?";
    db.get(sql, id, (err, row) => {
      if (err) {
        return console.error(err.message);
      }
      res.render("edit", { model: row });
    });
  };

  // Update a book
  exports.updateBook = (req, res) => {
    const id = req.params.id;
    const book = [req.body.Title, req.body.Author, req.body.Comment, id];
    const sql = "UPDATE Books SET Title = ?, Author = ?, Comment = ? WHERE (_id = ?)";
    db.run(sql, book, err => {
      if (err) {
        return console.error(err.message);
      }
      res.redirect("/books");
    });
  };

  // Select a book for deletion
  exports.selectForDelete = (req, res) => {
    const id = req.params.id;
    const sql = "SELECT * FROM Books WHERE _id = ?";
    db.get(sql, id, (err, row) => {
      if (err) {
        return console.error(err.message);
      }
      res.render("delete", { model: row });
    });
  };

  // Delete a book
  exports.deleteBook = (req, res) => {
    const id = req.params.id;
    const sql = "DELETE FROM Books WHERE _id = ?";
    db.run(sql, id, err => {
      if (err) {
        return console.error(err.message);
      }
      res.redirect("/books");
    });
  };
