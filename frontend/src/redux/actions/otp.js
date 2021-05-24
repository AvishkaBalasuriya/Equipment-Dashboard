export const setOtpUserId = (payload) =>{
    return({
        type:'SET_OTP_USER_ID',
        payload:payload
    })
}

export const setOtpId = (payload) =>{
    return({
        type:'SET_OTP_ID',
        payload:payload
    })
}

export const clearOtpData = () =>{
    return {
        type:'CLEAR_OTP_DATA'
    }
}