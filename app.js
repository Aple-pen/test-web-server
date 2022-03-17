const express = require("express")
require('dotenv').config({path:'mysql/.env'})
const mysql = require("./mysql")
const app = express();
const PORT = 3000

app.use(express.urlencoded({extended : true}))
app.use(express.json({
    limit : '50mb'
}))

app.get("/",(req,res)=>{
    res.send('Hello World~')
})

app.get("/api/customers",async(req,res)=>{
    const customers = await mysql.query("usersList")
    console.log(customers)
    res.send(customers)
})

app.post("/api/customer/insert",async(req,res)=>{
    const result = await mysql.query('usersInsert',req.body.param);
    console.log(result)
    res.send(result);
})

app.listen(PORT,()=>{
    console.log("server running~")

})