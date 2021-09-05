import React, { useRef } from 'react'
import { connect } from 'react-redux'
import { searchItems } from '../../actions/itemActions'
import PropTypes from 'prop-types'


const Search = ({ searchItems }) => {
    const text = useRef('')
    const onSearch = (e) => {
        searchItems(text.current.value)
    }
    return (
        
        <div className="nav-wrapper">
          <form>
            <div className="input-field">
              <input id="search"
               type="search"
               ref={text}
               onChange={onSearch}/>
              <label className="label-icon" htmlFor="search">Search</label>
            </div>
          </form>
        </div>
      
    )
}

// searchItems from items actions
Search.protoTypes = {
    searchItems: PropTypes.func.isRequired,
}

export default connect(null, { searchItems })(Search)
