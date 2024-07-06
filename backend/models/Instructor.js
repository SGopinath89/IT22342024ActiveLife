const mongoose = require('mongoose')
const Schema = mongoose.Schema

const instructorSchema = new Schema({
    name:{type:String, required:true},
    email:{type:String, required:true},
    phoneNo:{type:String, required:true},
    qualification:{type:String, required:true},
    experience:{type:String, required:true},
    specialities:{type:Array, required:true}
})

const Instructor =mongoose.model('instructors',instructorSchema)

module.exports = Instructor