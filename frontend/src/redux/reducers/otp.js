const otpReducer = (state=null,action)=>{
    switch(action.type){
        case "SET_OTP_USER_ID":
            return setOtpUserId(state,action.payload)
        case "SET_OTP_ID":
            return setOtpId(state,action.payload)
        case "CLEAR_OTP_DATA":
            return clearOtpData(state)
        default:
            return state
    }
}

function setOtpUserId(state,payload){
    if(state!=null){
        state["userId"]=payload.userId
    }else{
        let stateData = {
            userId:payload.userId
        }
        state=stateData
    }
    return state
}

function setOtpId(state,payload){
    if(state!=null){
        state["otpId"]=payload.otpId
    }else{
        let stateData = {
            otpId:payload.otpId
        }
        state=stateData
    }
    return state
}

function clearOtpData(state){
    state=null
    return state
}

export default otpReducer