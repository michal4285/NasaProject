import userName from './reducers/userName'
 
import {combineReducers,createStore} from 'redux';

const reducer=combineReducers({userName})

const store= createStore(reducer)
window.store=store
export default store;