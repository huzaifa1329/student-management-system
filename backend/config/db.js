const { MongoClient } = require("mongodb");

const client = new MongoClient(process.env.MONGO_URI);

let db;
let connectionPromise;

async function connectDB() {
    if (db) {
        return db;
    }

    if (!connectionPromise) {
        connectionPromise = client.connect();
    }

    await connectionPromise;

    db = client.db("studentDB");

    console.log("MongoDB Connected");

    return db;
}

function getDB() {
    return db;
}

module.exports = {
    connectDB,
    getDB
};