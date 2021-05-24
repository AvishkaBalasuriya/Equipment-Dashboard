export const updateCardData = (payload) =>{
    return({
        type:'UPDATE_CARD_DATA',
        payload:payload
    })
}

export const clearCardData = () =>{
    return {
        type:'CLEAR_CARD_DATA'
    }
}