const express = require('express')

const router = express.Router()
const Workout = require('../models/Workout')

router.get('/', async(req,res)=>{
    const result=await Workout.find();
    if(result){
        res.send(result);
    }else{
        res.status(404).send("Workout not found")
    }
})

//add new Workout
router.post('/',async (req, res) => {
    const{name,numberOfDays,howToDo,workoutImg}=req.body
    if(!name || !numberOfDays || !howToDo || !workoutImg){
        res.status(400).send("Please Provide required fields")
    }else{
        try{
            const results = await Workout.create({name,numberOfDays,howToDo,workoutImg})
            res.send(results);
        }catch(error){
            res.status(500).json(results)
        }
    }
});

//get single Workout
router.get('/:id',async(req,res)=>{
    const id=req.params.id;
    const result = await Workout.findById(id);
    if(result){
        res.send(result)
    }else{
        res.status(404).send("Workout not found")
    }
})

//update all Workout details
router.patch('/:id', async (req, res) => {
    const id = req.params.id;
    const updates = req.body;
    try {
        const workout = await Workout.findById(id);
        if (!workout) {
            return res.status(404).send("Workout not found");
        }
        const updatedFields = {};
        for (const key of Object.keys(updates)) {
            if (updates[key] !== undefined) {
                updatedFields[key] = updates[key];
            }
        }
        await workout.updateOne(updatedFields);
        const updatedWorkout = await Workout.findById(id);
        res.status(200).json(updatedWorkout);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

//delete Workout
router.delete('/:id',async(req,res)=>{
    const id=req.params.id;
    const workout = await Workout.findById(id);
    if(!workout){
        res.status(404).send("Workout not found")
    }else{
        try{
            const result = await Workout.deleteOne(workout)
            res.status(200).json(result)
        }catch(error){
            res.status(500).json(error)
        }
        
    }
})

module.exports=router