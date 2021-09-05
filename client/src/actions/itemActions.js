import axios from "axios";
import { 
    GET_SHOPPINGITEMS, 
    ADD_SHOPPINGITEM, 
    DEL_SHOPPINGITEM, 
    ERR_SHOPPINGITEM,
    SET_LOADING,
    ITEM_CHECKED,
    SEARCH_SHOPPINGITEM} from './types';

/// general err handler
const DispatchError = (dispatch, err) => dispatch({
    type: ERR_SHOPPINGITEM,
    payload: err.message
});

/// general request header
const config = {
    headers: {
      "Content-Type": "application/json",
    }
};

/// get all items
export const getShoppingItems = () => async (dispatch) => {
    try {
        const res = await axios.get('/api/spi');
        dispatch({
            type: GET_SHOPPINGITEMS,
            payload: res.data
        })
    } catch (err) {
         DispatchError(dispatch, err)
    }
}

/// update alter item check status
/// <parameter>shopping item / todo item</parameter>
export const itemChecked = (item) => {
    
    return async (dispatch) => {

        // alter item check status
        const itemNew = {
            ...item,
            check: !item.check
        }

        try {
            // send update request
            const res = await axios.put(`/api/spi/${item._id}`, itemNew, config)

            // if responsed data's _id === with item's _id, means successful update
            // return true
            // else return false
            if (res.data._id === item._id) {
                dispatch({
                    type: ITEM_CHECKED,
                    payload: itemNew
                })
                return true;
            } else {
                return false;
            }            
        } catch (err) {
            DispatchError(dispatch, err);
        }
    }
}

/// search items via name, info, shop
/// <parameter>text: string</parameter>
export const searchItems = (text) => async dispatch => {
    
    dispatch({
        type: SEARCH_SHOPPINGITEM,
        payload: text.trim().toUpperCase()
    })
}

/// delete item from collection
/// request delete from api passing _id
/// <parameter>item: object</parameter>
export const deleteItem = (item) => async dispatch => {
    try {
        const res = await axios.delete(`/api/spi/${item._id}`, config);
        if (res.data === item._id) {
            /// dispatch to reducer
            dispatch({
                type: DEL_SHOPPINGITEM,
                payload: res.data
            })
            return true;
        }
        return false;
    } catch (error) {
        DispatchError(dispatch, error);
        return false;
    }
}


/// add new item
/// <parameter>shopping item / todo item</parameter>
export const addSPItem = (item) => async dispatch => {

    // send post request
    // if successful return true, else return false
    try {
        // set page status is loading
        setLoading();
        
        const res = await axios.post('/api/spi', item, config)

        dispatch({
            type: ADD_SHOPPINGITEM,
            payload: res.data
        })
        return true;
    } catch (err) {
        DispatchError(dispatch, err)
        return false;
    }
}

export const setLoading = () => {
    return {
        type:SET_LOADING
    }
}

// export const getShoppingItem = (id) => (dispatch) => {
//     if (id === 1) {
//         return true;
//     }
//     else {
//         dispatch({
//             type: GET_SHOPPINGITEM,
//             payload: id
//         })   
//         return false;     
//     }

// }

const items = [
    {
        id: 1,
        name: "apple", 
        price: 3.5, 
        unit: "per kg", 
        shop: "Woolworth", 
        info: "Royal Gala",
        category: "shop",
        check: true
    },
    {
        id: 2,
        name: "apple", 
        price: 3.5, 
        unit: "per kg", 
        shop: "Woolworth", 
        info: "Royal Gala",
        category: "shop",
        check: false
    },
    {
        id: 3,
        name: "apple", 
        price: 3.5, 
        unit: "per kg", 
        shop: "Woolworth", 
        info: "Royal Gala",
        category: "shop",
        check: true
    }
];
