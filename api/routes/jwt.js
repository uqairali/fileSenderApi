
const express=require('express');
const router=express.Router();
const jwt =require('jsonwebtoken');


router.get('/login',(req,res)=>{
   
    const user={
        id:1,
        name:"uqair ali",
        email:'muqairlai@gmail.com'
    }
    jwt.sign({user}, 'secretkey',{ expiresIn:'20s' },(err,token)=>{
   res.json({token})
    })
})


router.post('/posts', verifyToken,(req,res)=>{
    jwt.verify(req.token, 'secretkey',(err,authData)=>{
        if(err){
            res.sendStatus(403);
        }else{
            res.json({
                message:'post created',
                authData
            })
        }
    })
   
})

function verifyToken(req,res,next){
    const header=req.headers['authorization'];
    if(typeof header !=='undefined'){
   const head=header.split(' ');
   const headToken=head[1];
   req.token=headToken;

   next();
    }else{
        res.sendStatus(403);
    }
}

module.exports=router;