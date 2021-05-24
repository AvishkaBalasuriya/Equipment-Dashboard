import {loadFromLocalStore} from '../localStore'

const initialState = () => {
    let state = loadFromLocalStore('chartDataReducer')
    if(state)
        return state
    else
        return {
            equipmentInventory:{
                data:[],
                xAxis:"",
                yAxis:"payload.yAxis",
                title:"",
                lastUpdate:"Unknown"
            }
        }
}

const chartDataReducer = (state=initialState(),action)=>{
    switch(action.type){
        case "SET_CHART_DATA":
            return setChartData(state,action.payload)
        case "CLEAR_CHART_DATA":
            return clearChartData(state)
        default:
            return state
    }
}

function setChartData(state,payload){
    if(state!=null){
        state[payload.name]={
            data:payload.data,
            xAxis:payload.xAxis,
            yAxis:payload.yAxis,
            title:payload.title,
            lastUpdate:payload.lastUpdate,
        }
    }else{
        state = {}
        state[payload.name]={
            data:payload.data,
            xAxis:payload.xAxis,
            yAxis:payload.yAxis,
            title:payload.title,
            lastUpdate:payload.lastUpdate,
        }
    }
    return state
}

function clearChartData(state){
    state=null
    return state
}

export default chartDataReducer