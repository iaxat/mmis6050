// This module handles routes related to books and performs CRUD operations using MongoDB
// See the following for mapping of SQL to MongoDB:
// https://docs.mongodb.com/manual/reference/sql-comparison/


// Require mongo client
const mongodb = require("mongodb");
const MongoClient = mongodb.MongoClient;
const ObjectID = mongodb.ObjectID;

// Alternative import syntax using object desctructuring
//const {MongoClient, ObjectID} = require("mongodb");

// Connection URL and database name
const connectionURL = //***************   PUT YOUR MONGODB ATLAS CONNECTION STRING HERE     ************************/
const databaseName = "crud-test";
const collectionName = "Books";

// Create a collection variable that can be used by all route handlers to execute queries
let collection;

// Utility function for running MongoDB queries.
// The callback function passed in should execute the desired query
// If the collection is not null (has already been retrieved), calls the callback function with the collection
// If the collection is null (has not been retrieved), initiates a new connection and calls the callback function with the collection
let executeMongoQuery = (callback) => {

    // Reuse the collection if it has already been initialized.
    // Otherwise, initiate a new connection
    if (collection) {
        console.log("reusing collection...")
        callback(collection);
    } else {
        console.log("initiating new connection to retrieve collection...");
        MongoClient.connect(connectionURL, { useNewUrlParser: true, useUnifiedTopology: true }, (err, client) => {
            collection = client.db(databaseName).collection(collectionName);
            callback(collection);
        });
    }

}

// Initialize the Books collection by adding some documents
// Add documents only if there are not already 5 in the collection (done to limit size of collection for this example)
executeMongoQuery((collection) => {

    collection.countDocuments((error, count) => {
        if (error) {
            return console.log("Error counting documents");
        }

        if (count <= 5) {
            collection.insertMany([
                {
                    "Title": "Book 1",
                    "Author": "Author 1",
                    "Comment": "Comment 1"
                },
                {
                    "Title": "Book 2",
                    "Author": "Author 2",
                    "Comment": "Comment 2"
                },
                {
                    "Title": "Book 3",
                    "Author": "Author 3",
                    "Comment": "Comment 3"
                }


            ], (err, result) => {
                if (err) return console.log("Error: ", err);
                console.log("Records inserted: ", result.result.n);
            });

        } else {
            console.log("Nothing inserted - Collection already contains at least 5 documents.");
        }
    })

})

// Retrieve all books
exports.getBooks = (req, res) => {
    executeMongoQuery((collection) => {
        // Use collection.find() to retrieve all records
        // https://docs.mongodb.com/manual/tutorial/query-documents/
        collection.find({}).toArray((error, books) => {
            if (error)
                return console.log(error.message);

            res.render("books", { model: books });
        });
    })
}

// Render the view to insert a new book
exports.newBook = (req, res) => {
    res.render("create", { model: {} });
};

// Insert a new book
exports.insertBook = (req, res) => {

    executeMongoQuery((collection) => {
        // Use collection.insertOne() to insert a single book
        // https://docs.mongodb.com/manual/tutorial/insert-documents/


    });

};

// Render the view to edit a book
exports.editBook = (req, res) => {
    const id = req.params.id;

    executeMongoQuery((collection) => {
        // Use collection.findOne() to retrieve one record
        // https://docs.mongodb.com/manual/tutorial/query-documents/


    });


};

// Update a book
exports.updateBook = (req, res) => {
    const id = req.params.id;

    executeMongoQuery((collection) => {
        // Use collection.updateOne() to update a single document
        // https://docs.mongodb.com/manual/tutorial/update-documents/


    });
};

// Select a book for deletion
exports.selectForDelete = (req, res) => {
    const id = req.params.id;

    executeMongoQuery((collection) => {
        // Use collection.findOne() to retrieve one record
        // https://docs.mongodb.com/manual/tutorial/query-documents/


    });

};

// Delete a book
exports.deleteBook = (req, res) => {
    const id = req.params.id;

    executeMongoQuery((collection) => {
        // Use collection.deleteOne() to delete one record
        // https://docs.mongodb.com/manual/tutorial/remove-documents/
        

    });
};