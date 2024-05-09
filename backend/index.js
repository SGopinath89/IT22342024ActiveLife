/*const express = require('express')
const app = express()
const cors=require('cors')
require('dotenv').config()
const port = process.env.PORT || 5000
console.log("DB username:",process.env.DB_USER)

//username=devsadini
//password=65dh3OolewveCipv
////mongodb connection

app.use(cors());
app.use(express.json())

const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@active-life.y0xkuj8.mongodb.net/?retryWrites=true&w=majority&appName=active-life`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    console.log("Connected to mongo")
    //create database and collection

    const database=client.db("active-life")
    const userCollection=database.collection("users")
    const workoutCollection=database.collection("workouts")
    const dietCollection=database.collection("diets")
    const instructorCollection=database.collection("instructors")

    //class routes 
    app.post('/new-user',async(req,res)=>{
        const newUser=req.body;
        console.log("send data success")
        const result= await userCollection.insertOne(newUser)
        res.send(result)
    })


    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);


app.get('/', (req, res) => {
  res.send('Hello Developers!!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})*/
const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config();
const port = process.env.PORT || 5000;
console.log("DB username:", process.env.DB_USER);

app.use(cors());
app.use(express.json());

const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@active-life.y0xkuj8.mongodb.net/?retryWrites=true&w=majority&appName=active-life`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
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
    console.log("Connected to MongoDB");

    
    const database = client.db("active-life");
    const userCollection = database.collection("users");
    const workoutCollection = database.collection("workouts");
    const dietCollection = database.collection("diets");
    const userWorkoutsCollection = database.collection("userWorkouts");
    const userDietsCollection = database.collection("userDiets");
    const instructorCollection = database.collection("instructors");

    //add new user
    app.post('/new-user', async (req, res) => {
      const newUser = req.body;

      const result = await userCollection.insertOne(newUser);
      res.send(result);
    });
    
    //add new diet
    app.post('/new-diet', async (req, res) => {
      const newDiet = req.body;

      const result = await dietCollection.insertOne(newDiet);
      res.send(result);
    });

    app.post('/new-workout', async (req, res) => {
      const newWorkout = req.body;

      const result = await workoutCollection.insertOne(newWorkout);
      res.send(result);
    });

    app.post('/new-userWorkout', async (req, res) => {
      const newUserWorkout = req.body;

      const result = await userWorkoutsCollection.insertOne(newUserWorkout);
      res.send(result);
    });
    
    app.post('/new-userDiet', async (req, res) => {
      const newUserDiet = req.body;

      const result = await userDietsCollection.insertOne(newUserDiet);
      res.send(result);
    });
    /*
    app.get('/',(req,res)=>{
      res.send('Hello Developers 2024')
    })*/

    //display all the users
    app.get('/users', async(req,res)=>{
      //const query ={name:"ABC"}
      const result=await userCollection.find().toArray();
      res.send(result);
    })

    //display all diets
    app.get('/diets', async(req,res)=>{
      const result=await dietCollection.find().toArray();
      res.send(result);
    })

    //display all workdouts
    app.get('/workouts', async(req,res)=>{
      const result=await workoutCollection.find().toArray();
      res.send(result);
    })
    
    //display workouts that each user has added to profile
    app.get('/userWorkouts', async(req,res)=>{
      const result=await userWorkoutsCollection.find().toArray();
      res.send(result);
    })

    //display diets that each user has added to profile
    app.get('/userDiets', async(req,res)=>{
      const result=await userDietsCollection.find().toArray();
      res.send(result);
    })
    
    //update number of days finished in workouts
    app.patch('/update-userWorkouts/:id',async(req,res)=>{
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


    //DB Connect
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
    
    app.listen(port, () => {
      console.log(`Example app listening on port ${port}`);
    });
  } catch (err) {
    console.error("Error connecting to MongoDB:", err);
  }
}

connectAndStartServer();
