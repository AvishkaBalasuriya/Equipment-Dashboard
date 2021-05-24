import {loadFromLocalStore} from '../localStore'

const initialState = () => {
    let state = loadFromLocalStore('authenticationReducer')
    if(state)
        return state
    else
        return null
}

const authenticationReducer = (state=initialState(),action)=>{
    switch(action.type){
        case "SET_LOGGED_USER":
            return login(state,action.payload)
        case "CLEAR_LOGGED_USER":
            return logout(state)
        default:
            return state
    }
}

function login(state,payload){
    if(state!=null){
        state["authToken"]=payload.authToken
        state["userData"]=payload.userData
    }else{
        let stateData = {
            authToken:payload.authToken,
            userData:payload.userData
        }
        state=stateData
    }
    return state
}

function logout(state){
    state=null
    return state
}

export default authenticationReducer