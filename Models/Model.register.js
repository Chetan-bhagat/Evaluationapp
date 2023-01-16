
const mongoose = require("mongoose");
require('dotenv').config()
// console.log(mongoose)
const connection = mongoose.connect(process.env.mongodb);
const registerschema = mongoose.Schema(
    {
        "name": String,
        "email": String,
        "gender": String,
        "password": String,
    }
);

const registermodel = mongoose.model("registerusers", registerschema);
module.exports = { registermodel }