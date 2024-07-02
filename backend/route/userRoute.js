const express = require('express')
const router = express.Router()
const User = require('../models/User')
const UserDiet = require('../models/UserDiet')
const UserHealthRecord = require('../models/UserHealthRecord')
const UserInstructor = require('../models/UserInstructor')
const UserWorkout = require('../models/userWorkout')
const Feedback = require('../models/Feedback')

router.get('/', async(req,res)=>{
    const result=await User.find();
    if(result){
        res.send(result);
    }else{
        res.status(404).send("User not found")
    }
})

//add new User
router.post('/', async (req, res) => {
    const {
      fullName, gender, email, phoneNo, age, address, userName, photoUrl, role, password, employmentStatus
    } = req.body;
    if (!fullName || !gender || !email || !phoneNo || !userName || !role || !password || !employmentStatus) {
      return res.status(400).send("Please provide all required fields");
    }
    try {
      const userData = { fullName, gender, email, phoneNo, age, userName, role, password, employmentStatus };
      if(address){
        userData.address = address;
      }
      if(photoUrl){
        userData.photoUrl = photoUrl;
      }
      const results = await User.create(userData);
      res.send(results);
    } catch (error) {
      res.status(500).json(error);
    }
});
  
//get single User
router.get('/:id',async(req,res)=>{
    const id=req.params.id;
    const result = await User.findById(id);
    if(result){
        res.send(result)
    }else{
        res.status(404).send("User not found")
    }
})

router.get('/email/:email',async(req,res)=>{
    const email=req.params.email;
    const query={email:email};
    const result = await User.findOne(query);
    res.send(result);
})

//update all User details
router.patch('/:id', async (req, res) => {
    const id = req.params.id;
    const updates = req.body;
    try {
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).send("User not found");
        }
        const updatedFields = {};
        for (const key of Object.keys(updates)) {
            if (updates[key] !== undefined) {
                updatedFields[key] = updates[key];
            }
        }
        await user.updateOne(updatedFields);
        const updatedUser = await User.findById(id);
        res.status(200).json(updatedUser);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.patch('/password/:id', async (req, res) => {
    const id = req.params.id;
    const { password } = req.body; 
    try {
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).send("User not found");
        }
        if (password) {
            user.password = password;
            await user.save();
        }

        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


//delete User
router.delete('/:id',async(req,res)=>{
    const id=req.params.id;
    const user = await User.findById(id);
    if(!user){
        res.status(404).send("User not found")
    }else{
        try{
            const result = await User.deleteOne(user)
            res.status(200).json(result)
        }catch(error){
            res.status(500).json(error)
        }
        
    }
})

router.delete('/byEmail-allDetails/:email', async (req, res) => {
    const email = req.params.email;
    const user = await User.findOne({ email: email });

    if (!user) {
        return res.status(404).send("User not found");
    }

    try {
        const deleteUser = await User.deleteOne({ email: email });
        const deleteUserDiet = await UserDiet.deleteMany({ userEmail: email });
        const deleteUserWorkout = await UserWorkout.deleteMany({ userEmail: email });
        const deleteUserHealthRecord = await UserHealthRecord.deleteMany({ email: email });
        const deleteUserInstructor = await UserInstructor.deleteMany({ userEmail: email });
        const deleteFeedback = await Feedback.deleteMany({ userEmail: email });

        const result = {
            deleteUser,
            deleteUserDiet,
            deleteUserWorkout,
            deleteUserHealthRecord,
            deleteUserInstructor,
            deleteFeedback
        };

        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


module.exports=router