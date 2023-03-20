const express = require('express');
const app = express()

const { MongoClient } = require('mongodb');
const url = 'mongodb://localhost:27017/';
const client = new MongoClient(url)

async function dbConnection() {
    let result = await client.connect()
    let db = result.db('E-commerce')
    let collName = db.collection('products')
    return collName;

}
const port = process.env.PORT || 8000
app.use(express.json());

//1. Create/Insert/Post
app.post('/products', async (req, res) => {
    let database = await dbConnection()
    let response = await database.insertMany(req.body);
    res.send(response)
})

//2. Read/Get
app.get('/products', async (req, res) => {
    let database = await dbConnection()
    let response = await database.find().toArray();
    res.send(response)
})
app.get('/products/:os', async (req, res) => {
    let database = await dbConnection()
    let response = await database.find({ os: req.params.os }).toArray();
    res.send(response)
})

//3. Update/Put
app.put('/products/:os', async (req, res) => {
    let database = await dbConnection()
    let response = await database.updateOne({ os: req.params.os }, { $set: req.body })
    res.send(response)
})

//4. Delete
app.delete('/products/:os', async (req, res) => {
    let database = await dbConnection()
    let response = await database.deleteOne({ os: req.params.os })
    res.send(response)
})

app.listen(port, () => {
    console.log(`server is listening on the port ${port}`)
})