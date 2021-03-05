const mongoose = require('mongoose');

const RegisterSchema= mongoose.model('Register', new mongoose.Schema({
    username: {type: String,},
    password:{type:String,},
    email:{type : String},
    isPurchased :{type:Boolean,default:false}
})
);

module.exports=RegisterSchema;