const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const config = require('config')
const mongoose = require('mongoose')
const path = require('path')
const socketServer = require('./services/socket')

const port = process.env.PORT || config.get('app.port') 

const app = express()

const authRoute = require('./routes/auth')
const otpRoute = require('./routes/otp')

const defaultUser = require('./helpers/defaults').createDefaultUser

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(express.static("public"))

app.use('/api/v1/auth',authRoute)
app.use('/api/v1/otp',otpRoute)

app.all('*',(req,res)=>{
  res.sendFile('index.html',{ root: path.join(__dirname, '/public/')})
})

const server = app.listen(port,async()=>{
    console.log(`Server started on port: ${port}`)
    try{
        await mongoose.connect(config.get('mongodb.connectionUrl'),{useNewUrlParser: true, useUnifiedTopology: true}) 
        console.log("Connected to mongodb database")

        await defaultUser(0)
        await defaultUser(1)
        
    }catch(e){
        console.log(e)
        console.log("Unable to connect to the mongodb database")
    }
})

socketServer.init(server).then(()=>{
    socketServer.listenToClients()
})
        