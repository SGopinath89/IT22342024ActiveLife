const mongoose = require('mongoose')
const Schema = mongoose.Schema

const workoutSchema = new Schema({
    name:{type:String, required:true},
    numberOfDays:{type:Number, required:true},
    howToDo:{type:String, required:true},
    workoutImg:{type:String, required:true},
    forGoal:{type:Array, required:true}
})

const Workout =mongoose.model('workouts',workoutSchema)

module.exports = Workout