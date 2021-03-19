const express = require ('express')
const app = express()
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const mongoUri = 'mongodb+srv://smitadeshpande:godurani@cluster0.kt3og.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'


require('./models/User')
const requireToken = require("../middleware/requireToken")
const authRoutes = require("./routes/authRoutes")

app.use(bodyParser.json())
app.use(authRoutes)





mongoose.connect(mongoUri,{
    useNewUrlParser:true,
    useUnifiedTopology:true
})
mongoose.connection.on('connected',() =>{
    console.log('connected to mongodbç')
})

app.get('/',requireToken,(req,res)=>{
    res.send('your email is ' + req.user.email)
})

app.listen(3000, ()=>{
    console.log('listing on port 3000')
})