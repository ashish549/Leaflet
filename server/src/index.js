var Express = require("express");
var { MongoClient } = require("mongodb"); 
var cors = require("cors");
const multer = require("multer");

var app = Express();
app.use(cors());

var CONNECTION_STRING = 'mongodb+srv://Iot:UhX8vUzhubYciroQ@guestmap.hzuakxe.mongodb.net/?retryWrites=true&w=majority';
var DATABASE = "guestmap";
var database;

app.listen(5000, () => {
    MongoClient.connect(CONNECTION_STRING, (error, client) => {
        if (error) {
            console.error("Error connecting to MongoDB:", error);
            return;
        }

        database = client.db(DATABASE);
        console.log("Mongo DB connection successful");
    });
});
