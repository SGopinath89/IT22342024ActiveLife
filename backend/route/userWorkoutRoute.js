const express = require('express')
const router = express.Router()
const userWorkout = require('../models/userWorkout')

router.get('/', async(req,res)=>{
    const result=await userWorkout.find();
    if(result){
        res.status(200).json(result)
    }else{
        res.status(404).send("userWorkout not found")
    }
})
router.get('/byId/:id', async (req, res) => {
    const id=req.params.id;
    const email =req.query.email;
    const query={workoutId:id, userEmail:email};
    const projection = {workoutId:1};
    const result = await userWorkout.findOne(query,{projection:projection})
    res.send(result);
});
//add new userWorkout
router.post('/',async (req, res) => {
    const{workoutName,workoutId,workoutImg,totaldays,userEmail,data}=req.body
    const finishedDays = 0;
    if(!workoutName || !workoutId || !workoutImg || !totaldays || !userEmail || !data ){
        res.status(400).send("Please Provide required fields"+data+totaldays)
    }else{
        try{
            const results = await userWorkout.create({workoutName,workoutId,workoutImg,totaldays,userEmail,data,finishedDays})
            res.send(results);
        }catch(error){
            res.status(500).json(error)
        }
    }
});

//get single userWorkout
router.get('/:userEmail', async (req, res) => {
    const userEmail = req.params.userEmail;
      const documents = await userWorkout.find({ userEmail: userEmail });
      if (documents.length > 0) {
        res.status(200).json(documents);
      } else {
        res.status(404).json({ error: 'No documents found' });
      }
});


//update userWorkout details
router.patch('/:id', async (req, res) => {
    const id = req.params.id;
    const updates = req.body;
    try {
        const UserWorkout = await userWorkout.findById(id);
        if (!UserWorkout) {
            return res.status(404).send("userWorkout not found");
        }
        const updatedFields = {};
        for (const key of Object.keys(updates)) {
            if (updates[key] !== undefined) {
                updatedFields[key] = updates[key];
            }
        }
        await UserWorkout.updateOne(updatedFields);
        const updateduserWorkout = await userWorkout.findById(id);
        res.status(200).json(updateduserWorkout);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

//delete userWorkout
router.delete('/:id',async(req,res)=>{
    const id=req.params.id;
    const UserWorkout = await userWorkout.findById(id);
    if(!UserWorkout){
        res.status(404).send("userWorkout not found")
    }else{
        try{
            const result = await userWorkout.deleteOne(UserWorkout)
            res.status(200).json(result)
        }catch(error){
            res.status(500).json(error)
        }
        
    }
})

module.exports=router