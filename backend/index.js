const express = require('express');
const app = express();
const port = 5000;
const cors = require('cors');
require('dotenv').config();
const jwt = require('jsonwebtoken');

app.use(cors());
const mongoose = require('mongoose')
const dietRoute = require('./route/dietRoute')
const userRoute = require('./route/userRoute')
const workoutRoute = require('./route/workoutRoute')
const instructorRoute = require('./route/instructorRoute')
const userWorkoutRoute = require('./route/userWorkoutRoute')
const userInstructorRoute = require('./route/userInstructorRoute')
const userDietRoute = require('./route/userDietRoute')
const userHealthRecordRoute = require('./route/userHealthRecordRoute')
const feedbackRoute = require('./route/feedbackRoute')

app.use(express.json());
app.use('/diet',dietRoute)
app.use('/user',userRoute)
app.use('/workout',workoutRoute)
app.use('/instructor',instructorRoute)
app.use('/userWorkout',userWorkoutRoute)
app.use('/userInstructor',userInstructorRoute)
app.use('/userDiet',userDietRoute)
app.use('/userHR',userHealthRecordRoute)
app.use('/feedback',feedbackRoute)


mongoose.connect('mongodb://127.0.0.1:27017/active-life').then(()=>{
    console.log("DB Connected")
}).catch((error)=>{
    console.error(error)
})


app.post('/api/set-token',async(req,res)=>{
  const user=req.body;
  var token = jwt.sign(user,process.env.ASSES_SECRET,{
    expiresIn:'24h'
  });
  res.send({token});
})

app.listen(port,()=>{
    console.log("The API is running on a port ",port)
})

