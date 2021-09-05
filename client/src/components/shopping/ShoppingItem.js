import React, { useState, useEffect } from 'react'
import 'materialize-css/dist/css/materialize.min.css';
import PropTypes from 'prop-types'
import { itemChecked, getShoppingItems, deleteItem } from '../../actions/itemActions'
import { connect } from 'react-redux'


const ShoppingItem = ({item, itemChecked, deleteItem}) => {
    const [checked, setChecked] = useState(item.check);

    // mark item status
    useEffect(() => {
        if(item) {
            setChecked(!checked);
        }
    }, [item.check])


    // when item clicked, alter item status
    const checkChanged = async () =>{
        if (await itemChecked(item))  setChecked(!checked);
    }

    // delete item
    const clickDelete = async () => {
        await deleteItem(item);
    }


    return (
        <div className="card-panel z-depth-1" style={{ borderRadius: "10px"}}>
            <div>
                <label className="black-text " key={item.id}>
                    <input type="checkbox" checked={!checked} onChange={checkChanged} />
                    <span><strong>{item.name}</strong></span>
                </label>  
                    <button className="btn right" onClick={clickDelete}>X</button>
            </div>

            <p><strong>${item.price} / {item.unit}</strong> - {item.shop}</p>
            <p>{item.info}</p>
     </div>
    )
}

ShoppingItem.propTypes = {
    id: PropTypes.number.isRequired,
    itemChecked: PropTypes.func.isRequired,
}

const mapStateToProp = (state, ownProp) => {
    let p = ownProp.id;
    return {
        item: state.spItems.items.find(it => it._id === p)
    }
}

export default connect(mapStateToProp, { itemChecked, getShoppingItems, deleteItem })(ShoppingItem)

