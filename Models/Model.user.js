const mongoose = require("mongoose");
require('dotenv').config()
// console.log(mongoose)
const connection = mongoose.connect(process.env.mongodb);
const userschema = mongoose.Schema(
    {
        "title": String,
        "body": String,
        "device": String,
        "userID": String
    }
);

const usermodel = mongoose.model("socialuser", userschema);
module.exports = { usermodel }
