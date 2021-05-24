export const setLoggedUser = (payload) =>{
    return({
        type:'SET_LOGGED_USER',
        payload:payload
    })
}

export const clearLoggedUser = () =>{
    return {
        type:'CLEAR_LOGGED_USER'
    }
}