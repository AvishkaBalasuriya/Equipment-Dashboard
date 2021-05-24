const initialState = {
    message:"",
    type:"success",
    status:false
}

const snackBarReducer = (state=initialState,action)=>{
    switch(action.type){
        case "SHOW_ALERT":
            return action.payload
        case "HIDE_ALERT":
            return initialState
        default:
            return state
    }
}

export default snackBarReducer