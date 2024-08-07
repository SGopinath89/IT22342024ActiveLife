const mongoose = require('mongoose')
const Schema = mongoose.Schema

const dietSchema = new Schema({
    name:{type:String, required:true},
    howItWorks:{type:String, required:true},
    benefits:{type:String, required:true},
    downsides:{type:String},
    dietImg:{type:String},
    forGoal:{type:Array, required:true}
})

const Diet =mongoose.model('diets',dietSchema)

module.exports = Diet