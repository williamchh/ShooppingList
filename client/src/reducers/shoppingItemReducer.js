import { ADD_SHOPPINGITEM, DEL_SHOPPINGITEM, SEARCH_SHOPPINGITEM, GET_SHOPPINGITEMS, ITEM_CHECKED, SET_LOADING } from '../actions/types';

const initialState = {
    items: null,
    loading: false,
    error: null,
    searchBackup: null
}

const SIReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_LOADING:
            return{
                ...state,
                loading: true
            }
        case ADD_SHOPPINGITEM:
            return {
                ...state,
                items:[ ...state.items, action.payload ],
                loading: false
            }
        case DEL_SHOPPINGITEM:
            return{
                ...state,
                items: state.items.filter(item => item._id !== action.payload)
            }
        case GET_SHOPPINGITEMS:
            return {
                ...state,
                items: action.payload,
                loading: false
            };
        case SEARCH_SHOPPINGITEM:
            if(state.searchBackup === null)
                state.searchBackup = state.items;
            else
                state.items = state.searchBackup;

            let _items = null;
            let t = action.payload;
            if (t !== "") {
                _items = state.searchBackup.filter(item => {

                    return item.name.toUpperCase().includes(t) ||
                    item.shop.toUpperCase().includes(t) ||
                    item.info.toUpperCase().includes(t)
                })                
            }
            else {
                _items = state.searchBackup;
                state.searchBackup = null;
            }
            

            return {
                ...state,
                items: _items
            }
        case ITEM_CHECKED:
            state.items = state.items.map(item => item._id === action.payload._id ? action.payload : item)
            return {
                ...state,
                loading: false
            }
        default:
            return state;
    }
}

export default SIReducer;