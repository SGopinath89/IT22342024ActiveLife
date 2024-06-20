const express = require('express')
const router = express.Router()
const User = require('../models/User')

router.get('/', async(req,res)=>{
    const result=await User.find();
    if(result){
        res.send(result);
    }else{
        res.status(404).send("User not found")
    }
})

//add new User
router.post('/',async (req, res) => {
    const{fullName,gender,email,phoneNo,age,address,userName,photoUrl,role,password,employmentStatus}=req.body
    if(!fullName || !gender || !email || !phoneNo || !age || !address || !userName || !photoUrl || !role || !password || !employmentStatus){
        res.status(400).send("Please Provide required fields")
    }else{
        try{
            const results = await User.create({fullName,gender,email,phoneNo,age,address,userName,photoUrl,role,password,employmentStatus})
            res.send(results);
        }catch(error){
            res.status(500).json(results)
        }
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

module.exports=router