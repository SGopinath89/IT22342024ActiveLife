const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userDietSchema = new Schema({
    dietName:{type:String, required:true},
    dietId:{type:String, required:true},
    userEmail:{type:String, required:true},
    dietImg:{type:String, required:true},
    date:{type:String, required:true}
})

const UserDiet =mongoose.model('userdiets',userDietSchema)

module.exports = UserDiet