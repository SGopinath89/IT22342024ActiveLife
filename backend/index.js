const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config();
const jwt = require('jsonwebtoken');
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const verifyJWT = (req,res,next)=>{
  const authorization=req.headers.authorization;
  if(!authorization){
    console.log(error.message)
    return res.status(401).send({message:"Invalid authorization"});
  }
  const token =authorization?.split(' ')[1];
  jwt.verify(token,process.env.ASSES_SECRET,(err,decoded)=>{
    if(err){
      return res.status(403 ).send({message:"Forbidden access"});
    }
    req.decoded=decoded;
    next();
  })
}

const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@active-life.y0xkuj8.mongodb.net/?retryWrites=true&w=majority&appName=active-life`;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function connectAndStartServer() {
  try {
    await client.connect();

    const database = client.db("active-life");
    const userCollection = database.collection("users");
    const userHealthRecordCollection = database.collection("userHealthRecords");
    const workoutCollection = database.collection("workouts");
    const dietCollection = database.collection("diets");
    const userWorkoutsCollection = database.collection("userWorkouts");
    const userDietsCollection = database.collection("userDiets");
    const userInstructorsCollection = database.collection("userInstructors");
    const instructorCollection = database.collection("instructors");

    app.post('/api/set-token',async(req,res)=>{
      const user=req.body;
      var token = jwt.sign(user,process.env.ASSES_SECRET,{
        expiresIn:'24h'
      });
      res.send({token});
    })

    //middleware for admin and instructor
    const verifyAdmin=async(req,res,next)=>{
      const email =req.decoded.email;
      const query ={email:email};
      const user=await userCollection.findOne(query);
      if(user.role==='admin'){
        next();
      }else{
        return res.status(401).send({message:"Forbidden access"});
      }
    }

    //add new user
    app.post('/new-user', async (req, res) => {
      const newUser = req.body;

      const result = await userCollection.insertOne(newUser);
      res.send(result);
    });
     
    //display all the users
    app.get('/users', async(req,res)=>{
      //const query ={name:"ABC"}
      const result=await userCollection.find().toArray();
      res.send(result);
    })

    //get user from id
    app.get('/users/:id',verifyJWT,async(req,res)=>{
      const id=req.params.id;
      const query={_id:new ObjectId(id)};
      const result = await userCollection.findOne(query);
      res.send(result);
    })

    //get user from email
    app.get('/user/:email',async(req,res)=>{
      const email=req.params.email;
      const query={email:email};
      const result = await userCollection.findOne(query);
      res.send(result);
    })

    //delete user
    app.delete('/delete-user/:id',async(req,res)=>{
      const id=req.params.id;
      const query = {_id: new ObjectId(id)};
      const result=await userCollection.deleteOne(query);
      res.send(result);
    })

    //update user details
    app.patch('/update-userDetails/:id',async(req,res)=>{
      const id=req.params.id;
      const updateUser=req.body;
      const filter={_id: new ObjectId(id)};
      const options={upsert:true};
      const updateDoc={
        $set:{
          
            fullName:updateUser.fullName,
            gender:updateUser.gender, 
            email:updateUser.email, 
            age:updateUser.age, 
            address:updateUser.address, 
            userName:updateUser.userName, 
            password:updateUser.password,
            photoUrl:updateUser.photoUrl, 
            employmentStatus:updateUser.employmentStatus
        
        }
      };
      const result =await userCollection.updateOne(filter,updateDoc,options)
      res.send(result);
    })

    //add new diet
    app.post('/new-diet',async (req, res) => {
      const newDiet = req.body;

      const result = await dietCollection.insertOne(newDiet);
      res.send(result);
    });

    //display all diets
    app.get('/diets', async(req,res)=>{
      const result=await dietCollection.find().toArray();
      res.send(result);
    })

    //get single diet
    app.get('/diets/:id',async(req,res)=>{
      const id=req.params.id;
      const query={_id:new ObjectId(id)};
      const result = await dietCollection.findOne(query);
      res.send(result);
    })
    
    //update all diet details
    app.put('/update-diets/:id',async(req,res)=>{
      const id=req.params.id;
      const updateDiet=req.body;
      const filter={_id: new ObjectId(id)};
      const options={upsert:true};
      const updateDoc={
        $set:{
          name:updateDiet.name,
          howItWorks:updateDiet.howItWorks,
          benefits:updateDiet.benefits,
          downsides:updateDiet.downsides
        }
      };
      const result =await dietCollection.updateOne(filter,updateDoc,options)
      res.send(result);
    })

    //delete diet
    app.delete('/delete-diet/:id',async(req,res)=>{
      const id=req.params.id;
      const query = {_id: new ObjectId(id)};
      const result=await dietCollection.deleteOne(query);
      res.send(result);
    })

    //add new workout
    app.post('/new-workout',async (req, res) => {
      const newWorkout = req.body;

      const result = await workoutCollection.insertOne(newWorkout);
      res.send(result);
    });

    //display all workdouts
    app.get('/workouts', async(req,res)=>{
      const result=await workoutCollection.find().toArray();
      res.send(result);
    })

    //get single workout
    app.get('/workouts/:id',async(req,res)=>{
      const id=req.params.id;
      const query={_id:new ObjectId(id)};
      const result = await workoutCollection.findOne(query);
      res.send(result);
    })

    //update workout
    app.put('/update-workouts/:id',async(req,res)=>{
      const id=req.params.id;
      const updateWorkout=req.body;
      const filter={_id: new ObjectId(id)};
      const options={upsert:true};
      const updateDoc={
        $set:{
          name:updateWorkout.name,
          numberOfDays:parseInt(updateWorkout.numberOfDays),
          howToDo:updateWorkout.howToDo
        }
      };
      const result =await workoutCollection.updateOne(filter,updateDoc,options)
      res.send(result);
    })

    //delete workout
    app.delete('/delete-workout/:id',async(req,res)=>{
      const id=req.params.id;
      const query = {_id: new ObjectId(id)};
      const result=await workoutCollection.deleteOne(query);
      res.send(result);
    })

    //add new instructor
    app.post('/new-instructor',async (req, res) => {
      const newInstructor = req.body;

      const result = await instructorCollection.insertOne(newInstructor);
      res.send(result);
    });

    //get single instructor
    app.get('/instructors/:id',async(req,res)=>{
      const id=req.params.id;
      const query={_id:new ObjectId(id)};
      const result = await instructorCollection.findOne(query);
      res.send(result);
    })

    //display all instructors
    app.get('/instructors', async(req,res)=>{
      const result=await instructorCollection.find().toArray();
      res.send(result);
    })

    //update instructor
    app.put('/update-instructors/:id',async(req,res)=>{
      const id=req.params.id;
      const updateInstructor=req.body;
      const filter={_id: new ObjectId(id)};
      const options={upsert:true};
      const updateDoc={
        $set:{
          name:updateInstructor.name,
          email:updateInstructor.email,
          phoneNo:updateInstructor.phoneNo,
          qualification:updateInstructor.qualification,
          experience:updateInstructor.experience,
          specialities:updateInstructor.specialities
        }
      };
      const result =await instructorCollection.updateOne(filter,updateDoc,options)
      res.send(result);
    })

    //delete instructor
    app.delete('/delete-instructor/:id',async(req,res)=>{
      const id=req.params.id;
      const query = {_id: new ObjectId(id)};
      const result=await instructorCollection.deleteOne(query);
      res.send(result);
    })

    //add workout to a user
    app.post('/new-userWorkout', async (req, res) => {
      const finishedDays = 0;
      const newUserWorkout = req.body;
      newUserWorkout.finishedDays = finishedDays;

      const result = await userWorkoutsCollection.insertOne(newUserWorkout);
      res.send(result);
    });
    
    //get single userWorkout
    app.get('/userWorkout/:id',async(req,res)=>{
      const id=req.params.id;
      const email =req.query.email;
      const query={workoutId:id, userEmail:email};
      const projection = {workoutId:1};
      const result = await userWorkoutsCollection.findOne(query,{projection:projection})
      res.send(result);
    })

    //get user's instructors by id
    app.get('/userInstructor/:id',async(req,res)=>{
      const id=req.params.id;
      const email =req.query.email;
      const query={instructorId:id, userEmail:email};
      const projection = {instructorId:1};
      const result = await userInstructorsCollection.findOne(query,{projection:projection})
      res.send(result);
    })
    
    /*
    app.get('/userDiets-PipeEmail/:email',async(req,res)=>{
      
      const email=req.params.email;
      const query={userEmail:email};
      //console.log(email)
      
      const pipeline=[
        {
          $match: query
        },
        {
          $lookup:{
            from:"diets",
            localField:"_id",
            foreignField:"dietId",
            as:"diets"
          }
        },
        {
          $unwind:"$diets"
        },
        {
          $lookup:{
            from:"users",
            localField:"diets.name",
            foreignField:"email",
            as:"dName"
          }
        },
        {
          $project:{
            _id:0,
            dName:{
              $arrayElemAt:["$dName",0]
            },
            diets:1
          }
        }
      ];
      const result = await userDietsCollection.aggregate(pipeline).toArray(); 
      console.log(result)
      res.send(result);
    })*/
    
    /*
    app.get('/userWorkouts-email/:email',async(req,res)=>{
      
      const email=req.params.email;
      const query={userEmail:email};
      
      const pipeline=[
        {
          $match: query
        },
        {
          $lookup:{
            from:"workouts",
            localField:"_id",
            foreignField:"workoutId",
            as:"workouts"
          }
        },
        {
          $unwind:"$workouts"
        },
        {
          $lookup:{
            from:"users",
            localField:"workouts.name",
            foreignField:"email",
            as:"wName"
          }
        },
        {
          $project:{
            _id:0,
            dName:{
              $arrayElemAt:["$wName",0]
            },
            workouts:1
          }
        }
      ];
      const result = await userWorkoutsCollection.aggregate(pipeline).toArray(); 
      //console.log(result)
      res.send(result);
    })*/

    //display workouts that each user has added to profile
    app.get('/userWorkouts', async(req,res)=>{
      const result=await userWorkoutsCollection.find().toArray();
      res.send(result);
    })

    //update number of days finished in workouts
    app.patch('/update-userWorkoutDays/:id',async(req,res)=>{
      const id=req.params.id;
      const days=req.body.finishedDays;
      const filter={_id:new ObjectId(id)};
      const options={upsert:true};
      const updateDoc={
        $set:{
          finishedDays:days
        }
      }
      const result = await userWorkoutsCollection.updateOne(filter,updateDoc,options);
      res.send(result);
    })

    //delete user workouts
    app.delete('/delete-userWorkout/:id',async(req,res)=>{
      const id=req.params.id;
      const query = {_id: new ObjectId(id)};
      const result=await userWorkoutsCollection.deleteOne(query);
      res.send(result);
    })

    //get all user instructors
    app.get('/userInstructors', async(req,res)=>{
      const result=await userInstructorsCollection.find().toArray();
      res.send(result);
    })

    //delete user instructors
    app.delete('/delete-userInstructor/:id',async(req,res)=>{
      const id=req.params.id;
      const query = {_id: new ObjectId(id)};
      const result=await userInstructorsCollection.deleteOne(query);
      res.send(result);
    });

    //add new user instructor
    app.post('/new-userInstructor', async (req, res) => {
      const newUserInstructor = req.body;
      const result = await userInstructorsCollection.insertOne(newUserInstructor);
      res.send(result);
    });

    //add diet to a user
    app.post('/new-userDiet', async (req, res) => {
      const newUserDiet = req.body;

      const result = await userDietsCollection.insertOne(newUserDiet);
      res.send(result);
    });
    
    //get single userDiet
    app.get('/userDiet/:id',async(req,res)=>{
      const id=req.params.id;
      const email =req.query.email;
      const query={dietId:id, userEmail:email};
      const projection = {dietId:1};
      const result = await userDietsCollection.findOne(query,{projection:projection})
      res.send(result);
    })
    
    //get user diet by email
    app.get('/userDiet-Email/:userEmail', async (req, res) => {
      const userEmail = req.params.userEmail;
      try {
        const documents = await userDietsCollection.find({ userEmail: userEmail }).toArray();
        if (documents.length > 0) {
          res.status(200).json(documents);
        } else {
          res.status(404).json({ error: 'No documents found' });
        }
      } catch (error) {
        res.status(500).json({ error: 'An error occurred while fetching the documents' });
      }
    });
    
    //get user workout by email
    app.get('/userWorkout-Email/:userEmail', async (req, res) => {
      const userEmail = req.params.userEmail;
      try {
        const documents = await userWorkoutsCollection.find({ userEmail: userEmail }).toArray();
        if (documents.length > 0) {
          res.status(200).json(documents);
        } else {
          res.status(404).json({ error: 'No documents found' });
        }
      } catch (error) {
        res.status(500).json({ error: 'An error occurred while fetching the documents' });
      }
    });

    //get user Instructor by email
    app.get('/userInstructor-Email/:userEmail', async (req, res) => {
      const userEmail = req.params.userEmail;
      try {
        const documents = await userInstructorsCollection.find({ userEmail: userEmail }).toArray();
        if (documents.length > 0) {
          res.status(200).json(documents);
        } else {
          res.status(404).json({ error: 'No documents found' });
        }
      } catch (error) {
        res.status(500).json({ error: 'An error occurred while fetching the documents' });
      }
    });

    //display diets that each user has added to profile
    app.get('/userDiets', async(req,res)=>{
      const result=await userDietsCollection.find().toArray();
      res.send(result);
    })
  
    //delete user diet
    app.delete('/delete-userDiet/:id',async(req,res)=>{
      const id=req.params.id;
      const query = {_id: new ObjectId(id)};
      const result=await userDietsCollection.deleteOne(query);
      res.send(result);
    })

    //user Health Record 
    app.post('/new-userHealthRecord', async (req, res) => {
      const newRecord = req.body;
      const result = await userHealthRecordCollection.insertOne(newRecord);
      res.send(result);
    });

    app.get('/userHealthRecord/:email',async(req,res)=>{
      const email = req.params.email;
      try {
        const documents = await userHealthRecordCollection.find({ email: email }).toArray();
        if (documents.length > 0) {
          res.status(200).json({ documents, count: documents.length });
        } else {
          res.status(200).json({ count: 0 });
        }
      } catch (error) {
        res.status(500).json({ error: 'An error occurred while fetching the documents' });
      }
      
    })

    app.get('/userHealthRecord-Nocount/:email',async(req,res)=>{
      const email = req.params.email;
      try {
        const result = await userHealthRecordCollection.findOne({ email: email });
        //console.log(result)
        res.send(result);
        
      } catch (error) {
        res.status(500).json({ error: 'An error occurred while fetching the documents' });
      }
      
    })

    //update user health record
    app.patch('/update-userHRecord/:email', async (req, res) => {
      const email = req.params.email;
      const updateRecord = req.body;
      const filter = { email: email };
      const options = { upsert: true };
      const updateDoc = {
        $set: {}
      };
    
      // Loop through each key in updateRecord
      for (const key in updateRecord) {
        // If the value is not null, update the field
        if (updateRecord[key] !== null) {
          updateDoc.$set[key] = updateRecord[key];
        }
      }
      
      const result =await userHealthRecordCollection.updateOne(filter,updateDoc,options)
      res.send(result);
    })

    app.get('/',(req,res)=>{
      res.send('Active Life Server is running!!')
    })

    //DB Connect
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
    
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  } catch (err) {
    console.error("Error connecting to MongoDB:", err);
  }
}

connectAndStartServer();
