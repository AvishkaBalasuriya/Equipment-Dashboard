export const showAlert = (payload) =>{
    return({
        type:'SHOW_ALERT',
        payload:payload
    })
}

export const hideAlert = () =>{
    return {
        type:'HIDE_ALERT'
    }
}