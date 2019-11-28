import React from 'react'
import PropTypes from 'prop-types'
import './index.css'

function FractionPart({ value, onChange }) {
    return (
        <div className='fraction__part'>
            <input type='text' value={value} onChange={onChange} />
        </div>
    )
}

FractionPart.propTypes = {
    value: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
}

export default FractionPart

