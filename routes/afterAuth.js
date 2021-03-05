const express = require("express");
const AuthMongoose=require('../model/auth.model');

const verify= require('./jwtAuth')
const authRouter = express.Router();

authRouter.get('/',verify, async (req,res) => {

await AuthMongoose.findOne({_id:req.id})
.then(authMongoose=> res.json(authMongoose))
.catch(err=>res.status(4004).json("Error" + err))

// res.send(req.id)
});

module.exports=authRouter