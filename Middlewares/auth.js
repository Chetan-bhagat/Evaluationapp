var jwt = require('jsonwebtoken');
require('dotenv').config()

const auth = async (req, res, next) => {
    const payload = req.body;
    const token = req.headers.token
    console.log(token)
    if (token) {
        var decoded = jwt.verify(token, process.env.key);
        if (decoded) {
            req.body.userID = decoded.ID;
            next()
           
        }
        else {
            res.send("Token Failed")
        }
    } else {
        res.send("Provide tokens")
    }
}

module.exports={auth}