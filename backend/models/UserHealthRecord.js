const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userHealthRecordSchema = new Schema({
    weight:{type:Number},
    height:{type:Number},
    averageHeartRate:{type:Number},
    bloodPressure:{type:Number},
    sleepHours:{type:Number},
    stressScale:{type:Number},
    currentLevelofPhysicalActivity:{type:String},
    existingMedicalCondition:{type:String},
    anySurgeries:{type:String},
    AnyAllergies:{type:String},
    fitnessGoals:{type:Array},
    email:{type:String}
    
})

const UserHealthRecord =mongoose.model('userhealthrecords',userHealthRecordSchema)

module.exports = UserHealthRecord