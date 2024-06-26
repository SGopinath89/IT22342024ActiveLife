const express = require('express')
const router = express.Router()
const UserHealthRecord = require('../models/UserHealthRecord')

router.get('/', async(req,res)=>{
    const result=await UserHealthRecord.find();
    if(result){
        res.status(200).json(result)
    }else{
        res.status(404).send("UserHealthRecord not found")
    }
})

//add new UserHealthRecord
router.post('/',async (req, res) => {
    const{weight,height,averageHeartRate,bloodPressure,sleepHours,stressScale,currentLevelofPhysicalActivity,existingMedicalCondition,anySurgeries,AnyAllergies,fitnessGoals,email}=req.body
        try{
            const results = await UserHealthRecord.create({weight,height,averageHeartRate,bloodPressure,sleepHours,stressScale,currentLevelofPhysicalActivity,existingMedicalCondition,anySurgeries,AnyAllergies,fitnessGoals,email})
            res.send(results);
        }catch(error){
            res.status(500).json(error)
        }
});

//get single UserHealthRecord
router.get('/:email', async (req, res) => {
    const email = req.params.email;
    try {
      const documents = await UserHealthRecord.find({ email: email });
      if (documents.length > 0) {
        res.status(200).json({ documents, count: documents.length });
      } else {
        res.status(200).json({ count: 0 });
      }
    } catch (error) {
      res.status(500).json({ error: 'An error occurred while fetching the documents' });
    }
});

//update UserHealthRecord details
router.patch('/:email', async (req, res) => {
    const email = req.params.email;
    const updates = req.body;
    try {
        const userHealthRecord = await UserHealthRecord.findOne({ email: email });
        if (!userHealthRecord) {
            return res.status(404).send("UserHealthRecord not found");
        }
        const updatedFields = {};
        for (const key of Object.keys(updates)) {
            if (updates[key] !== undefined) {
                updatedFields[key] = updates[key];
            }
        }
        await UserHealthRecord.updateOne({ email: email }, updatedFields);
        const updatedUserHealthRecord = await UserHealthRecord.findOne({ email: email });
        res.status(200).json(updatedUserHealthRecord);
    } catch (error) {
        console.error('Error updating user health record:', error);
        res.status(500).json({ error: error.message });
    }
});


//delete UserHealthRecord
router.delete('/:email',async(req,res)=>{
    const email=req.params.email;
    const userHealthRecord = await UserHealthRecord.findOne({email:email});
    if(!userHealthRecord){
        res.status(404).send("UserHealthRecord not found")
    }else{
        try{
            const result = await UserHealthRecord.deleteOne(userHealthRecord)
            res.status(200).json(result)
        }catch(error){
            res.status(500).json(error)
        }
        
    }
})

module.exports=router