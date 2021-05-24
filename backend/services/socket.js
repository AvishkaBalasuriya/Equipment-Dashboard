const socketio = require("socket.io")
const jwtMiddleware = require('../middlewares/jwt').SocketJWT
const ivivaService = require('../services/iviva')
const ivivaHelper = require('../helpers/iviva')

let io = null

async function init(server){
  io = await socketio(server,{
    cors: {
      origin: '*',
    }
  })
}

function listenToClients(){
  if(io){
    console.log("Started to listen to socket clients")
    io.use(jwtMiddleware).on('connection', async(socket) => {
      console.log("New connection. Started to pushing data....")
      const result = await ivivaService.getEquipmentData()
      if(result.success){
        let data = await ivivaHelper.makeChartData(result.data)
        if(data)
          io.emit('updated', data)
      }
    })
    setInterval(async()=>{
      const result = await ivivaService.getEquipmentData()
      if(result.success){
        let data = await ivivaHelper.makeChartData(result.data)
        if(data)
          io.emit('updated', data)
      }
    },60000)
  }
}

exports.init=init
exports.listenToClients=listenToClients