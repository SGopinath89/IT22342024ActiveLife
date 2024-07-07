const express = require('express')
const router = express.Router()
const UserDiet = require('../models/UserDiet')

router.get('/', async(req,res)=>{
    const result=await UserDiet.find();
    if(result){
        res.status(200).json(result)
    }else{
        res.status(404).send("UserDiet not found")
    }
})

//add new UserDiet
router.post('/',async (req, res) => {
    const{dietName,dietId,userEmail,dietImg,date}=req.body
    if(!dietName || !dietId || !userEmail || !dietImg || !date){
        res.status(400).send(result)
    }else{
        try{
            const results = await UserDiet.create({dietName,dietId,userEmail,dietImg,date})
            res.send(results);
        }catch(error){
            res.status(500).json(error)
        }
    }
});

//get single UserDiet
router.get('/:userEmail', async (req, res) => {
    const userEmail = req.params.userEmail;
      const documents = await UserDiet.find({ userEmail: userEmail });
      if (documents.length > 0) {
        res.status(200).json(documents);
      } else {
        res.status(404).json({ error: 'No documents found' });
      }
});

router.get('/byId/:id', async (req, res) => {
    const id=req.params.id;
    const email =req.query.email;
    const query={dietId:id, userEmail:email};
    const projection = {dietId:1};
    const result = await UserDiet.findOne(query,{projection:projection})
    res.send(result);
});


//update UserDiet details
router.patch('/:id', async (req, res) => {
    const id = req.params.id;
    const updates = req.body;
    try {
        const userDiet = await UserDiet.findById(id);
        if (!userDiet) {
            return res.status(404).send("UserDiet not found");
        }
        const updatedFields = {};
        for (const key of Object.keys(updates)) {
            if (updates[key] !== undefined) {
                updatedFields[key] = updates[key];
            }
        }
        await userDiet.updateOne(updatedFields);
        const updatedUserDiet = await UserDiet.findById(id);
        res.status(200).json(updatedUserDiet);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

//delete UserDiet
router.delete('/:id',async(req,res)=>{
    const id=req.params.id;
    const userDiet = await UserDiet.findById(id);
    if(!userDiet){
        res.status(404).send("UserDiet not found")
    }else{
        try{
            const result = await UserDiet.deleteOne(userDiet)
            res.status(200).json(result)
        }catch(error){
            res.status(500).json(error)
        }
        
    }
})

module.exports=router