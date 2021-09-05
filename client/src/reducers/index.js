import { combineReducers } from 'redux'
import SIReducer from './shoppingItemReducer'



export default combineReducers({
    spItems:SIReducer
});