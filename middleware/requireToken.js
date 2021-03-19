const jwt = require('jsonwebtoken')
const mongoose  =require('mongoose')
const User = mongoose.model('User')
const{jwtkeys} =require("../src/routes/keys")

module.exports= (req,res,next) =>{
    const{authorization} = req.headers;
    if(!authorization){
        return res.status(401).send({error: "ypu must be login"})
    }
    const token =authorization.replace("Bearer ","");
    jwt.verify(token,jwtkeys,async(err,payload)=>{
        if(err){
            return res.status(401).send({error: "you must be login"})
        }
        const{userId} = payload
        const user = await User.findById(userId)
        req.user = user
        next();
    })
}