const express = require("express");
const app = express();
const { usermodel } = require("../Models/Model.user");
const userrout = express.Router()
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
app.use(express.json())


// ****************GET DATA*****************
userrout.get("/", async (req, res) => {
    try {
        const Allregister = await usermodel.find();
        await res.send(Allregister)
    } catch (err) {
        res.send(err)
    }
});

// ****************POST *****************
userrout.post("/addpost", async (req, res) => {
    const payload=req.body;
    console.log("inn")
    try {
        const add = await new usermodel(payload);
        await add.save()
        const Allregister = await usermodel.find();
        await res.send(Allregister)
        
    } catch (err) {
        res.send(err)
    }
});


// ****************update*****************
userrout.patch("/update/:id", async (req, res) => {
    const payload=req.body
    const id=req.params.id;
    try {
        const catchemail = await usermodel.find({"_id":id});
        const bodyuserid=catchemail[0].userID;
        const userId=req.body.userID;
        console.log(payload,bodyuserid,userId)
        if(bodyuserid==userId){
           const data= await usermodel.findByIdAndUpdate({"_id":id},payload);
           const Allregister = await usermodel.find();
           await res.send(Allregister)
        }else{
            res.send("You are not Authorized")
        }
        

    } catch (err) {
        res.send(err)
    }
});

// *************************DELETE********************
userrout.delete("/delete/:id", async (req, res) => {
    const id=req.params.id;
    try {
        const catchemail = await usermodel.find({"_id":id});
        const bodyuserid=catchemail[0].userID;
        const userId=req.body.userID;
        if(bodyuserid==userId){
           const data= await usermodel.findByIdAndDelete({"_id":id});
           const Allregister = await usermodel.find();
           await res.send(Allregister)
        }else{
            res.send("You are not Authorized")
        }
    } catch (err) {
        res.send(err)
    }
});
module.exports = { userrout }

//eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJJRCI6IjYzYzUxYWFhMGJmZWZkY2I3MmE5MTczZiIsImlhdCI6MTY3Mzg2MTgzM30.PbPI27vEdP01jjVt9XMaGVQuNKMPQOYtiw4HMepTzSo