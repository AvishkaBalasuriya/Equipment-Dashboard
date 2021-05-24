import {createStore,applyMiddleware,compose} from 'redux';
import rootReducer from './reducers/index'
import {storeListner} from './localStore'

const middlewareEnhancer = applyMiddleware(storeListner)
const composedEnhancers = compose(middlewareEnhancer,window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())

export const store = createStore(rootReducer,undefined,composedEnhancers)

