const express = require("express")
require('dotenv').config({path:'mysql/.env'})
const mysql = require("./mysql")
const app = express();
const PORT = 3000
const multer = require("multer")

app.use(express.urlencoded({extended :true,limit : '50mb',parameterLimit : 10000000}))
app.use(express.json({
    limit : '50mb'
}))
app.use('/uploads', express.static('uploads'));

const storage = multer.diskStorage({
    destination : function(req,file,cb){
        cb(null,'uploads/')
    },
    filename : function(req,file,cb){
        cb(null,new Date().valueOf() +"_"+ file.originalname);
    }
})

const upload = multer({storage:storage})

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

app.post("/api/users/test",upload.single('file'),async(req,res)=>{
    console.log(req.file)
    console.log(req.filename)
    console.log(req)
    res.json({
        success: true,
        image: res.req.file.path,
        fileName: res.req.file.filename,
    })
})

app.post("/api/users/edit",async(req,res)=>{
    const value = req.body.param
    const obj = {
        id : "",
        key : "",
        value : ""
    }

    let sendArr = []
    if(value.id){
        obj.id = value.id
        obj.key = Object.keys(value).filter(val=>val !== "id")[0]
        obj.value = value[obj.key]

        sendArr = [obj.value,obj.id]
    }else{
        res.send("id parameter require")
    }
    try{
        const result = await mysql.query("userEditProfilePic",sendArr)
        res.send("SUCCESS")
        console.log(result)
    }catch(e){
        console.log(e)
        res.send("FAIL")
    }

})

app.listen(PORT,()=>{
    console.log("server running~")

})