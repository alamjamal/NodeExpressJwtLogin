require('dotenv').config();
const express = require("express");
const bcrypt= require('bcryptjs');
const jwt = require('jsonwebtoken');
const authRouter = express.Router();

const authValidate = require("../validation/authValidation");

const AuthMongoose= require('../model/auth.model')

//2. post for signup
authRouter.post("/register", async (req, res) => {
    const error  = authValidate(req.body);
    if (error.result==="FAILD")return res.status(404).json(error)

const checkEmail = await AuthMongoose.findOne({email:req.body.email})
if(checkEmail) return res.json('email already present')

const salt = await bcrypt.genSalt(10);
const hashPassword= await bcrypt.hash(req.body.password, salt);
const authMongoose = new AuthMongoose({
    username: req.body.username,
    email: req.body.email,
    password : hashPassword
});
await authMongoose.save()
.then(authMongoose=>{res.json(authMongoose);})
.catch(err => res.status(400).json('Error: ' + err));

});


//2. post for login
authRouter.post("/login", async (req, res) => {
    const user = await AuthMongoose.findOne({email:req.body.email})
    if(!user) return res.status(400).json("user not found");
    
    const validatePassword= await bcrypt.compare(req.body.password, user.password);
    if(!validatePassword) return res.status(400).json("password not correct");

    //create and assign token
    const token = jwt.sign({_id:user.id}, process.env.TOKEN_SECRET);

    res.header('auth-token', token).send()

});

module.exports = authRouter;

//