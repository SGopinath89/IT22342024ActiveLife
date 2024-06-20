const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userWorkoutSchema = new Schema({
    workoutName:{type:String, required:true},
    workoutId:{type:String, required:true},
    workoutImg:{type:String, required:true},
    totaldays:{type:Number, required:true},
    userEmail:{type:String, required:true},
    data:{type:String, required:true},
    finishedDays:{type:Number, required:true}
})

const userWorkout =mongoose.model('userworkouts',userWorkoutSchema)

module.exports = userWorkout