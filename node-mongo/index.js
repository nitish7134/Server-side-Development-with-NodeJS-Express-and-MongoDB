const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const dboper = require('./operations');

const url = 'mongodb://localhost:27017/';
const dbname = 'conFusions';

MongoClient.connect(url, (err, client) => {

    assert.equal(err, null);

    console.log('Connected correctly to server');

    const db = client.db(dbname);
    const collection = db.collection("dishes");
    dboper.insertDocument(db, { name: "Vadonut", description: "Test" },
        "dishes", (result) => {
            console.log("Insert Document:\n", result.ops);

            dboper.findDocuments(db, "dishes", (docs) => {
                console.log("Found Documents:\n", docs);

                dboper.updateDocument(db, { name: "Vadonut" },
                    { description: "Updated Test" }, "dishes",
                    (result) => {
                        console.log("Updated Document:\n", result.result);

                        dboper.findDocuments(db, "dishes", (docs) => {
                            console.log("Found Updated Documents:\n", docs);

                            db.dropCollection("dishes", (result) => {
                                console.log("Dropped Collection: ", result);

                                client.close();
                            });
                        });
                    });
            });
        });

});

/* //const MongoClient = require('mongodb').MongoClient;
const {MongoClient} = require('mongodb');
const assert = require('assert');
const dboper = require('./operations');
const uri = "mongodba+srv://conFusionTest:confusion@cluster0.ww6l.mongodb.net/confusionDB?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, bufferMaxEntries: 0, reconnectTries: 5000, useUnifiedTopology: true });
client.connect(err => {
    // perform actions on the collection object
    assert.equal(err, null);
    console.log('Connected correctly to server');
    const db = client.db("confusionDB");
    //const collection = db.collection("dishes");
    dboper.insertDocument(db, { name: "Vadonut", description: "Test" }, "dishes", (result) => {
        console.log("Insert Document:\n", result.ops);
        dboper.findDocuments(db, "dishes", (docs) => {
            console.log("Found Documents:\n", docs);

            dboper.updateDocument(db, { name: "Vadonut" }, { description: "Updated Test" }, "dishes", (result) => {
                console.log("Updated Document:\n", result.result);

                dboper.findDocuments(db, "dishes", (docs) => {
                    console.log("Found Updated Documents:\n", docs);

                    db.dropCollection("dishes", (result) => {
                        console.log("Dropped Collection: ", result);

                        client.close();
                    });
                });
            });
        });
    });
}); */