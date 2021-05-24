export const setChartData = (payload) =>{
    return({
        type:'SET_CHART_DATA',
        payload:payload
    })
}

export const clearChartData = () =>{
    return {
        type:'CLEAR_CHART_DATA'
    }
}