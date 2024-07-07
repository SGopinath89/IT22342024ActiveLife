const express = require('express')

const router = express.Router()
const Diet = require('../models/Diet')

router.get('/', async(req,res)=>{
    const result=await Diet.find();
    if(result){
        res.send(result);
    }else{
        res.status(404).send("Diet not found")
    }
})

//add new diet
router.post('/',async (req, res) => {
    const{name,howItWorks,benefits,downsides,dietImg,forGoal}=req.body
    if(!name || !howItWorks || !benefits || !forGoal){
        res.status(400).send(result)
    }else{
        try{
            const dData = {name,howItWorks,benefits,forGoal}
            if(dietImg){
                dData.dietImg = dietImg;
            }
            if(downsides){
                dData.downsides = downsides;
            }
            const results = await Diet.create(dData)
            res.send(results);
        }catch(error){
            res.status(500).json(results)
        }
    }
});

//get single diet
router.get('/:id',async(req,res)=>{
    const id=req.params.id;
    const result = await Diet.findById(id);
    if(result){
        res.send(result)
    }else{
        res.status(404).send("Diet not found")
    }
})

//update all diet details
router.patch('/:id', async (req, res) => {
    const id = req.params.id;
    const updates = req.body;
    try {
        const diet = await Diet.findById(id);
        if (!diet) {
            return res.status(404).send("Diet not found");
        }
        const updatedFields = {};
        for (const key of Object.keys(updates)) {
            if (updates[key] !== undefined) {
                updatedFields[key] = updates[key];
            }
        }
        await diet.updateOne(updatedFields);
        const updatedDiet = await Diet.findById(id);
        res.status(200).json(updatedDiet);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

//delete diet
router.delete('/:id',async(req,res)=>{
    const id=req.params.id;
    const diet = await Diet.findById(id);
    if(!diet){
        res.status(404).send("Diet not found")
    }else{
        try{
            const result = await Diet.deleteOne(diet)
            res.status(200).json(result)
        }catch(error){
            res.status(500).json(error)
        }
        
    }
})

module.exports=router