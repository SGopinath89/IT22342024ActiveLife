const express = require('express')
const router = express.Router()
const Feedback = require('../models/Feedback')

router.get('/', async(req,res)=>{
    const result=await Feedback.find();
    if(result){
        res.status(200).json(result)
    }else{
        res.status(404).send("Feedback not found")
    }
})

//add new Feedback
router.post('/',async (req, res) => {
    const{rating,service,suggesions,userEmail,userName}=req.body
    const status = "Pending"
        try{
            const results = await Feedback.create({rating,service,suggesions,userEmail,userName,status})
            res.send(results);
        }catch(error){
            res.status(500).json(error)
        }
});

//get single Feedback
router.get('/:userEmail', async (req, res) => {
    const userEmail = req.params.userEmail;
      const documents = await Feedback.find({ email: userEmail });
      if (documents.length > 0) {
        res.status(200).json(documents);
      } else {
        res.status(404).json({ error: 'No documents found' });
      }
});

//update Feedback details
router.patch('/:id', async (req, res) => {
    const id = req.params.id;
    const updates = req.body;
    try {
        const feedback = await Feedback.findById(id);
        if (!feedback) {
            return res.status(404).send("Feedback not found");
        }
        const updatedFields = {};
        for (const key of Object.keys(updates)) {
            if (updates[key] !== undefined) {
                updatedFields[key] = updates[key];
            }
        }
        await feedback.updateOne(updatedFields);
        const updatedFeedback = await Feedback.findById(id);
        res.status(200).json(updatedFeedback);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

//delete Feedback
router.delete('/:id',async(req,res)=>{
    const id=req.params.id;
    const feedback = await Feedback.findById(id);
    if(!feedback){
        res.status(404).send("Feedback not found")
    }else{
        try{
            const result = await Feedback.deleteOne(feedback)
            res.status(200).json(result)
        }catch(error){
            res.status(500).json(error)
        }
        
    }
})

module.exports=router