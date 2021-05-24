import {io} from "socket.io-client"
import configData from '../config.json'

import {store} from '../redux/store'
import {updateCardData} from '../redux/actions/cardData'
import {setChartData} from '../redux/actions/chartData'

let socket=null

const listenToDataStream = async(token) => {
    console.log("Started to listen")
    socket = await io(configData.server.host,{
        query: {token}
    })
    socket.on("updated",(data)=>{
        store.dispatch(updateCardData({
            name:"operational",
            count:data.cardData.operational,
            lastUpdate: new Date().toISOString()
        }))
        store.dispatch(updateCardData({
            name:"nonOperational",
            count:data.cardData.nonOperational,
            lastUpdate: new Date().toISOString()
        }))
        store.dispatch(setChartData({
            name:"equipmentInventory",
            data:data.chartData,
            yAxis:"count",
            xAxis:"category",
            title:"Equipment Inventory",
            lastUpdate: new Date().toISOString()
        }))
    })
}

export {
    listenToDataStream
}