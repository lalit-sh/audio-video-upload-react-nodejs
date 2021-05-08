import mongoose from "mongoose";
mongoose.Promise = require("bluebird");

let dbName = process.env.DB_NAME;
const dbAddress = process.env.DB_HOST;
// const dbPort = process.env.DB_PORT;

let options = {
    // useNewUrlParser: true,
    // useUnifiedTopology: true,
    // user:process.env.DB_USER,
    // pass: process.env.DB_PASS,
    // dbName: dbName
    useNewUrlParser: true, useUnifiedTopology: true
};

mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@${dbAddress}/${dbName}?retryWrites=true&w=majority`, options).catch(err => {
    if (err.message.indexOf("ECONNREFUSED") !== -1) {
        console.error("Error: The server was not able to reach MongoDB. Maybe it's not running?");
        process.exit(1);
    } else {
        throw err;
    }
});


