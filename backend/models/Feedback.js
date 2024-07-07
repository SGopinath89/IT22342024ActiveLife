const mongoose = require('mongoose')
const Schema = mongoose.Schema

const feedbackSchema = new Schema({
    rating:{type:String, required:true},
    service:{type:String, required:true},
    suggesions:{type:String, required:true},
    userEmail:{type:String, required:true},
    userName:{type:String, required:true},
    status:{type:String, required:true}
})

const Feedback =mongoose.model('feedbacks',feedbackSchema)

module.exports = Feedback