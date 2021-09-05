import React, { useState }  from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Modal } from 'materialize-css';
import M from 'materialize-css/dist/js/materialize.min.js'
import { addSPItem } from '../../actions/itemActions'

const modalStyle = {
    width: '65%',
    height: '95%',
    borderRadius: '10px'
}


const AddLogModal = ({ addSPItem }) => {
    
    const [name, setName] = useState('');
    const [check, setCheck] = useState(false);
    const [category, setCategory] = useState('Shopping Item')
    const [price, setPrice] = useState(0)
    const [shop, setShop] = useState('')
    const [info, setInfo] = useState('')
    const [unit, setUnit] = useState('')

    /// add new item to collection
    /// submit 
    const onSubmit = () => {
        if (name === '' || category === '') {
            M.toast({ html: 'Please enter shopping item name'})
        }
        const newItem = {
           name, price, category, check, shop, info, unit
        }
        console.log(newItem);
        if(addSPItem(newItem))
            M.toast({ html: 'new shopping item added'})
        else
            M.toast({ html: 'item NOT added'})
        // clear fields
        setName('')
        setCheck(false)
        setPrice(0)
        setShop('')
        setUnit('')
        setInfo('')
    }

    return (
        <div 
            style={modalStyle}
            id='add-spi-modal' 
            className='modal'>
                <div className="modal-content">
                    <h4>Add Items</h4>

                    {/* item name */}
                    <div className="row">
                        <div className="input-field">
                            <input type="text" name='productName' value={name} 
                            onChange={e => setName(e.target.value)} />
                            <label className="active" htmlFor='productName'>
                                Item Name
                            </label>
                        </div>
                    </div>

                    {/* product price */}
                    <div className="row">
                        <div className="input-field">
                            <input type="text" name='price' value={price} 
                            onChange={e => setPrice(e.target.value)} />
                            <label className="active" htmlFor='price'>
                                Product price
                            </label>
                        </div>
                    </div>
                    
                    {/* product unit */}
                    <div className="row">
                        <div className="input-field">
                            <input type="text" name='unit' value={unit} 
                            onChange={e => setUnit(e.target.value)} />
                            <label className="active" htmlFor='unit'>
                                Product Unit
                            </label>
                        </div>
                    </div>
                    {/* product shop */}
                    <div className="row">
                        <div className="input-field">
                            <input type="text" name='shop' value={shop} 
                            onChange={e => setShop(e.target.value)} />
                            <label className="active" htmlFor='shop'>
                                Product shop
                            </label>
                        </div>
                    </div>
                    {/* product info */}
                    <div className="row">
                        <div className="input-field">
                            <input type="text" name='info' value={info} 
                            onChange={e => setInfo(e.target.value)} />
                            <label className="active" htmlFor='info'>
                                Product info
                            </label>
                        </div>
                    </div>

                    {/* choose category */}
                    <div className="row">
                        <div className="input-field">
                            <select name="tech"
                            onChange={e => setCategory(e.target.value)} 
                            id={category} 
                            className="browser-default">
                                <option value='' disabled>Select Tech</option>
                                <option value='Shopping Item'>Shopping Item</option>
                                <option value='To Do'>To Do</option>
                            </select>
                        </div>
                    </div>

                    {/* submit */}
                    <div className="modal-footer">
                        <a href='#!'
                        onClick={onSubmit}
                        className='modal-close waves-effect waves-green btn-flat'>
                            Enter
                        </a>
                    </div>
                </div>
        </div>
    )
}

/// add shopping item to collection function required from actions
AddLogModal.prototype = {
    addSPItem: PropTypes.func.isRequired,
}

export default connect(null, { addSPItem })(AddLogModal)
