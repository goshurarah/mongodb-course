const router=require('./router')
const express=require('express')
const app=express()
app.use(express.json())
app.use(router)

const port = process.env.PORT || 3000; 
app.listen(port, () => {
    console.log(`server is listening to the port ${port}`)
}) 