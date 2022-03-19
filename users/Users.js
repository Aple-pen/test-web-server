const mysql = require("../mysql");
const multer = require("multer");
const router = require("express").Router();

const storage = multer.diskStorage({
    destination : function(req,file,cb){
        cb(null,'uploads/')
    },
    filename : function(req,file,cb){
        cb(null,new Date().valueOf() +"_"+ file.originalname);
    }
})

const upload = multer({storage:storage})

/**
 * 전체 사용자 검색
 * /api/users
 */
router.get("/",async(req,res)=>{
    const customers = await mysql.query("usersList")
    console.log(customers)
    res.send(customers)
})

/**
 * 사용자 추가
 * /api/users/insert
 */
router.post("/insert",async(req,res)=>{
    const result = await mysql.query('usersInsert',req.body.param);
    console.log(result)
    res.send(result);
})

/**
 * 사용자 정보 변경
 * /api/users/edit
 * {
 *     id : ""  (필수)
 * }
 */
router.post("/edit",async(req,res)=>{
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


router.post("/picture",upload.single('file'),async(req,res)=>{
    console.log(req.file)
    console.log(req.filename)
    console.log(req)
    res.json({
        success: true,
        image: res.req.file.path,
        fileName: res.req.file.filename,
    })
})

module.exports = router