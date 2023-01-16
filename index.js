const { config } = require("dotenv");
const express=require("express");
const Social_media_app=express();
require('dotenv').config()
const {connection}= require("./Configs/db")
const {registerrout}=require("./Routers/Router.register");
const {userrout}=require("./Routers/Router.users");
const {auth}=require("./Middlewares/auth")
Social_media_app.use(express.json())

Social_media_app.get("/",(req,res)=>{
    res.send("Welcome")
})
// *************Routers************
Social_media_app.use("/users",registerrout)
Social_media_app.use(auth)
Social_media_app.use("/posts",userrout);



// *************Server************
Social_media_app.listen(process.env.port,async()=>{
  try{
    await connection;
    console.log("Connected to DataBase✔️")
  }catch(err){
    console.log("ERROR in Database connection❌", err)
  }
  console.log("Server is running ......✅")
})