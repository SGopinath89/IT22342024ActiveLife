const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
    fullName:{type:String, required:true},
    gender:{type:String, required:true},
    email:{type:String, required:true},
    phoneNo:{type:String, required:true},
    age:{type:Number, required:true},
    address:{type:String},
    userName:{type:String, required:true},
    photoUrl:{type:String},
    role:{type:String, required:true},
    password:{type:String, required:true},
    employmentStatus:{type:String, required:true}

})

const User =mongoose.model('users',userSchema)

module.exports = User