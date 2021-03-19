const express = require('express')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const { jwtkeys } = require("./keys")
const router = express.Router()


const User = mongoose.model('User')



router.post('/signup', async (req, res) => {
  console.log(req.body)

  const { email, password } = req.body

  try {
    const user = new User({ email, password })
    await user.save()
    const token = jwt.sign({ userId: user._id }, jwtkeys)
    res.send({ token })
  } catch (err) {
    res.status(422).send(err.message)

  }

})

router.post('/signin',async(req,res) =>{
  const{email,password} = req.body
  if(!email || !password){
    return res.status(422).send({error:"must provide email and password"})
  }
  const user =  await User.findOne({email})
  if(!user){
    return res.status(422).send({error:"must provide email and password"})

  }

  try {
    await user.comparePassword(password)
    const token = jwt.sign({ userId: user._id }, jwtkeys)
    res.send({ token })
    
  } catch (error) {
    return res.status(422).send({error:"must provide email and password"})
    
  }
 
})

module.exports = router