const express = require("express");
const app = express();
const { registermodel } = require("../Models/Model.register");
const registerrout = express.Router()
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
app.use(express.json())

// ****************GET*****************
registerrout.get("/", (req, res) => {
    res.send("Welocme to register page")
});



// ****************NEW REGISTER*****************
registerrout.post("/register", async (req, res) => {
    const payload = req.body;
    try {
        console.log(payload)
        bcrypt.hash(payload.password, 2, async (err, hash) => {
            payload.password = hash;
            if (hash) {
                console.log(payload)
                const add = await new registermodel(payload);
                await add.save()
                const Allregister = await registermodel.find();
                await res.send(Allregister);
            } else {
                res.send("error hashing")
            }
        });

    } catch (err) {
        res.send(err)
    }
});

// ****************Login*****************
registerrout.post("/login", async (req, res) => {
    const { email, password } = req.body;
    try {
        const catchemail = await registermodel.find({ email });
        if (catchemail.length > 0) {
            bcrypt.compare(password, catchemail[0].password, async (err, result) => {
                if (result) {
                    var token = jwt.sign({ ID: catchemail[0]._id }, process.env.key)
                    await res.send({
                        "msg": "Loggin chetan",
                        "token": token
                    });
                } else {
                    res.send("error login")
                }
            });

        } else {
            res.send("Email not found")
        }

    } catch (err) {
        res.send(err)
    }
});
module.exports = { registerrout }

//eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJJRCI6IjYzYzUxYWFhMGJmZWZkY2I3MmE5MTczZiIsImlhdCI6MTY3Mzg2MTgzM30.PbPI27vEdP01jjVt9XMaGVQuNKMPQOYtiw4HMepTzSo