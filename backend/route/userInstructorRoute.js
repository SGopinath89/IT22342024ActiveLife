const express = require('express')
const router = express.Router()
const UserInstructor = require('../models/UserInstructor')

router.get('/', async(req,res)=>{
    const result=await UserInstructor.find();
    if(result){
        res.status(200).json(result)
    }else{
        res.status(404).send("UserInstructor not found")
    }
})
router.get('/byId/:id', async (req, res) => {
    const id=req.params.id;
    const email =req.query.email;
    const query={dietId:id, userEmail:email};
    const projection = {dietId:1};
    const result = await UserInstructor.findOne(query,{projection:projection})
    res.send(result);
});

//add new UserInstructor
router.post('/',async (req, res) => {
    const{instructorName,instructorId,userEmail,speciality,instructorEmail,data,status,userName}=req.body
    if(!instructorName || !instructorId || !userEmail || !speciality || !instructorEmail || !data || !status || !userName){
        res.status(400).send("Please Provide required fields")
    }else{
        try{
            const results = await UserInstructor.create({instructorName,instructorId,userEmail,speciality,instructorEmail,data,status,userName})
            res.send(results);
        }catch(error){
            res.status(500).json(error)
        }
    }
});

//get single UserInstructor
router.get('/:userEmail', async (req, res) => {
    const userEmail = req.params.userEmail;
      const documents = await UserInstructor.find({ userEmail: userEmail });
      if (documents.length > 0) {
        res.status(200).json(documents);
      } else {
        res.status(404).json({ error: 'No documents found' });
      }
});

//update UserInstructor Status
router.patch('/:id', async (req, res) => {
    const id = req.params.id;
    const updates = req.body;
    try {
        const userInstructor = await UserInstructor.findById(id);
        if (!userInstructor) {
            return res.status(404).send("UserInstructor not found");
        }
        const updatedFields = {};
        for (const key of Object.keys(updates)) {
            if (updates[key] !== undefined) {
                updatedFields[key] = updates[key];
            }
        }
        await userInstructor.updateOne(updatedFields);
        const updatedUserInstructor = await UserInstructor.findById(id);
        res.status(200).json(updatedUserInstructor);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

//delete UserInstructor
router.delete('/:id',async(req,res)=>{
    const id=req.params.id;
    const userInstructor = await UserInstructor.findById(id);
    if(!userInstructor){
        res.status(404).send("UserInstructor not found")
    }else{
        try{
            const result = await UserInstructor.deleteOne(userInstructor)
            res.status(200).json(result)
        }catch(error){
            res.status(500).json(error)
        }
        
    }
})

module.exports=router