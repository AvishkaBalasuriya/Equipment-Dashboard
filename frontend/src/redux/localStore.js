const saveToLocalStore = (action) => {
    if(action.type==="SET_LOGGED_USER"){
        localStorage.setItem("authenticationReducer",JSON.stringify(action.payload))

    }else if(action.type==="UPDATE_CARD_DATA"){
        let data = loadFromLocalStore("cardDataReducer")
        let payload = action.payload
        if(data){
            data[payload.name]={count:payload.count,lastUpdate:payload.lastUpdate}
        }else{
            data = {}
            data[payload.name]={count:payload.count,lastUpdate:payload.lastUpdate}
        }
        localStorage.setItem("cardDataReducer",JSON.stringify(data))

    }else if(action.type==="SET_CHART_DATA"){
        let data = loadFromLocalStore("chartDataReducer")
        let payload = action.payload
        if(data){
            data[payload.name]={data:payload.data,xAxis:payload.xAxis,yAxis:payload.yAxis,title:payload.title,lastUpdate:payload.lastUpdate}
        }else{
            data = {}
            data[payload.name]={data:payload.data,xAxis:payload.xAxis,yAxis:payload.yAxis,title:payload.title,lastUpdate:payload.lastUpdate}
        }
        localStorage.setItem("chartDataReducer",JSON.stringify(data))

    }else if(action.type==="CLEAR_LOGGED_USER"){
        localStorage.removeItem("authenticationReducer")
        localStorage.removeItem("cardDataReducer")
        localStorage.removeItem("chartDataReducer")
    }
}

const storeListner = (_) => {
    return next => action => {
        const returnValue = next(action)
        saveToLocalStore(action)
        return returnValue
    }
}

const loadFromLocalStore = (key) => {
    let data = JSON.parse(localStorage.getItem(key))
    if(data)
        return data
    return false
}

export {
    storeListner,
    loadFromLocalStore
}