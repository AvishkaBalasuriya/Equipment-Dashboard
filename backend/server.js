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
        // mongoose.connect(`mongodb+srv://${config.get("mongodb.user")}:${config.get("mongodb.password")}@${config.get("mongodb.host")}/${config.get("mongodb.database")}?retryWrites=true&w=majority`, 
        // {useNewUrlParser: true, useUnifiedTopology: true}) 
        mongoose.connect("mongodb://mongo:27017/EquipmentDashboard?readPreference=primary&appname=MongoDB%20Compass&ssl=false",{useNewUrlParser: true, useUnifiedTopology: true}) 
        console.log("Connected to mongodb database")

        defaultUser(0)
        defaultUser(1)
        
    }catch(e){
        console.log(e)
        console.log("Unable to connect to the mongodb database")
    }
})

socketServer.init(server).then(()=>{
    socketServer.listenToClients()
})
        