import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import loadingGif from '../../images/loading.gif';
import Search from '../layout/Search'

import ShoppingItem from './ShoppingItem'
import { getShoppingItems } from '../../actions/itemActions'


const ShoppingList = ({ shoppingItems: { items, loading }, getShoppingItems }) => {
           

    // get shopping items 
    useEffect(() => {
        getShoppingItems();
        // eslint-disable-next-line
    }, []);


    // if loading items from db, show loading indicator
    if (loading || items == null) {
        return <div className="center"><img height="100px" src={loadingGif}  /></div>;
    }
    
        
    return (
        <div>
            <aside>
                <Search />
                {
                !loading && items !== null && items.length === 0
                ? (<p> no shopping items</p>)
                :  (items.map(item => 
                <ShoppingItem id={item._id} />
                // (<h2>{item.name}</h2>)
                ))}
            </aside>
        </div>
    )
}

ShoppingList.protoTypes = {
    shoppingItems: PropTypes.object.isRequired,
    getShoppingItems: PropTypes.func.isRequired,
}

const mapStateToProp = state => ({
    shoppingItems: state.spItems
})


export default connect(mapStateToProp, { getShoppingItems })(ShoppingList)
