const express=require('express')
const auth=require("../auth/index")
const User=require('../model/user')



const router=new express.Router()


router.get('/',async(req,res)=>{
    try {

        console.log("server is working")


        res.render('dashboard')
    } catch (err) {
        console.log(err.message)
        return res.status(400).json({
            msg:"error",
            error:err.message
        })
    }
})


router.get('/signup',async(req,res)=>{
    try {
         
        res.render('signup')
    } catch (err) {
        console.log(err.message)
        return res.status(400).json({
            msg:"error",
            error:err.message
        })
    }
})

router.post('/signup',async(req,res)=>{
    try {
         const user=new User(req.body)
         await user.save()

         res.render('dashboard')
    } catch (err) {
        console.log(err.message)
        return res.status(400).json({
            msg:"error",
            error:err.message
        })
    }
})




router.get('/login',async(req,res)=>{
    try {

            
        
        res.render('login',{
            test:"something here..."
        })
    } catch (err) {
        console.log(err.message)
        return res.status(400).json({
            msg:"error",
            error:err.message
        })
    }
})

router.post('/login',async(req,res)=>{
    try {
         const email=req.body.email
         const password=req.body.password

         const userEmailExists=await User.findOne({email:email})
         if(!userEmailExists){
             return res.status(400).json({
                 msg:"error",
                 error:"user with this email does not exists"
             })
         }

         if(password != userEmailExists.password){
             return res.status(400).json({
                 msg:"error",
                 error:"Password does not match"
             })
         }

         res.render('dashboard')
    } catch (err) {
        console.log(err.message)
        return res.status(400).json({
            msg:"error",
            error:err.message
        })
    }
})



module.exports=router