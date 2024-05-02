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

// Connect to MongoDB and start the server
async function connectAndStartServer() {
  try {
    // Connect the client to the MongoDB server
    await client.connect();
    console.log("Connected to MongoDB");

    // Database and collections setup
    const database = client.db("active-life");
    const userCollection = database.collection("users");
    const workoutCollection = database.collection("workouts");
    const dietCollection = database.collection("diets");
    const instructorCollection = database.collection("instructors");

    // Routes
    app.post('/new-user', async (req, res) => {
      const newUser = req.body;

      // Insert new user into the 'users' collection
      const result = await userCollection.insertOne(newUser);
      res.send(result);
    });
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
    
    // Start the Express server
    app.listen(port, () => {
      console.log(`Example app listening on port ${port}`);
    });
  } catch (err) {
    console.error("Error connecting to MongoDB:", err);
  }
}

// Call the connectAndStartServer function to connect to MongoDB and start the server
connectAndStartServer();
