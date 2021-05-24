import {loadFromLocalStore} from '../localStore'

const initialState = () => {
    let state = loadFromLocalStore('cardDataReducer')
    if(state)
        return state
    else
        return {
            operational:{
                count:0,
                lastUpdate:"Unknown"
            },
            nonOperational:{
                count:0,
                lastUpdate:"Unknown"
            }
        }
}

const cardDataReducer = (state=initialState(),action)=>{
    switch(action.type){
        case "UPDATE_CARD_DATA":
            return updateCardData(state,action.payload)
        case "CLEAR_CARD_DATA":
            return clearCardData(state)
        default:
            return state
    }
}

function updateCardData(state,payload){
    if(state!=null){
        state[payload.name]={
            count:payload.count,
            lastUpdate:payload.lastUpdate
        }
    }else{
        state = {}
        state[payload.name]={
            count:payload.count,
            lastUpdate:payload.lastUpdate
        }
    }
    return state
}

function clearCardData(state){
    state=null
    return state
}

export default cardDataReducer