const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userInstructorSchema = new Schema({
    instructorName:{type:String, required:true},
    instructorId:{type:String, required:true},
    userEmail:{type:String, required:true},
    speciality:{type:String, required:true},
    instructorEmail:{type:String, required:true},
    data:{type:String, required:true},
    status:{type:String, required:true},
    userName:{type:String, required:true}
})

const UserInstructor =mongoose.model('userinstructors',userInstructorSchema)

module.exports = UserInstructor