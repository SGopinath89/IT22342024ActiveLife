const express = require('express')

const router = express.Router()
const Instructor = require('../models/Instructor')

router.get('/', async(req,res)=>{
    const result=await Instructor.find();
    if(result){
        res.send(result);
    }else{
        res.status(404).send("Instructor not found")
    }
})

//add new Instructor
router.post('/',async (req, res) => {
    const{name,email,phoneNo,qualification,experience,specialities}=req.body
    if(!name || !email || !phoneNo || !qualification || !experience || !specialities){
        res.status(400).send(result)
    }else{
        try{
            const results = await Instructor.create({name,email,phoneNo,qualification,experience,specialities})
            res.send(results);
        }catch(error){
            res.status(500).json(results)
        }
    }
});

//get single Instructor
router.get('/:id',async(req,res)=>{
    const id=req.params.id;
    const result = await Instructor.findById(id);
    if(result){
        res.send(result)
    }else{
        res.status(404).send("Instructor not found")
    }
})

//update all Instructor details
router.patch('/:id', async (req, res) => {
    const id = req.params.id;
    const updates = req.body;
    try {
        const instructor = await Instructor.findById(id);
        if (!instructor) {
            return res.status(404).send("Instructor not found");
        }
        const updatedFields = {};
        for (const key of Object.keys(updates)) {
            if (updates[key] !== undefined) {
                updatedFields[key] = updates[key];
            }
        }
        await instructor.updateOne(updatedFields);
        const updatedInstructor = await Instructor.findById(id);
        res.status(200).json(updatedInstructor);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

//delete Instructor
router.delete('/:id',async(req,res)=>{
    const id=req.params.id;
    const instructor = await Instructor.findById(id);
    if(!instructor){
        res.status(404).send("Instructor not found")
    }else{
        try{
            const result = await Instructor.deleteOne(instructor)
            res.status(200).json(result)
        }catch(error){
            res.status(500).json(error)
        }
        
    }
})

module.exports=router