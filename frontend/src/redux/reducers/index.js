import {combineReducers} from 'redux'

import authenticationReducer from './authentication'
import otpReducer from './otp'
import cardDataReducer from './cardData'
import chartDataReducer from './chartData'
import loadingPanelReducer from './loadingPanel'
import snackBarReducer from './snackBar'

const rootReducer = combineReducers({
    authenticationReducer:authenticationReducer,
    otpReducer:otpReducer,
    cardDataReducer:cardDataReducer,
    chartDataReducer:chartDataReducer,
    loadingPanelReducer:loadingPanelReducer,
    snackBarReducer:snackBarReducer
})

export default rootReducer