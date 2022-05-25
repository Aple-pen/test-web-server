const express = require("express")
require('dotenv').config({path:'mysql/.env'})
const mysql = require("./mysql")
const app = express();
const PORT = 8081
const multer = require("multer")
const cors = require("cors")

app.use(express.urlencoded({extended :true,limit : '50mb',parameterLimit : 10000000}))
app.use(express.json({
    limit : '50mb'
}))
app.use('/uploads', express.static('uploads'));
app.use( cors({
    origin: ['http://localhost:3001'],
    credentials: true,
}),)

app.get("/",(req,res)=>{
    res.send('Hello World~')

})

const users = require("./users/Users")
app.use("/api/users",users)



app.listen(PORT,()=>{
    console.log("server running~")
})
