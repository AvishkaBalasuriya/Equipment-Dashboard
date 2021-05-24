const loadingPanelReducer = (state=false,action)=>{
    switch(action.type){
        case "SHOW_LOADING":
            return state=true
        case "HIDE_LOADING":
            return state=false
        default:
            return state
    }
}

export default loadingPanelReducer