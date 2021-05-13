import mongoose from "mongoose";
mongoose.Promise = require("bluebird");

let dbName = process.env.DB_NAME;
const dbAddress = process.env.DB_HOST;
const dbPort = process.env.DB_PORT;

let options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    user:process.env.DB_USER,
    pass: process.env.DB_PASS,
    dbName: dbName
};

const db = async () => {
    try{
        let connection = await mongoose.connect(`mongodb://${dbAddress}:${dbPort}`, options);
        return connection;
    }catch(err){
        if (err.message.indexOf("ECONNREFUSED") !== -1) {
            console.error("Error: The server was not able to reach MongoDB. Maybe it's not running?");
            process.exit(1);
        } else {
            throw err;
        }
    }
}

module.exports = {mongoose: db};

// mongoose.connect(`mongodb://${dbAddress}:${dbPort}`, options).catch(err => {
//     if (err.message.indexOf("ECONNREFUSED") !== -1) {
//         console.error("Error: The server was not able to reach MongoDB. Maybe it's not running?");
//         process.exit(1);
//     } else {
//         throw err;
//     }
// });

// module.exports = {mongoose};


