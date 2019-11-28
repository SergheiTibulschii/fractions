import React from 'react'
import PropTypes from 'prop-types'
import './index.css'
import FractionPart from './FractionPart'

function Fraction({ index, numerator, denominator, onNumChange, onDenomChange }) {
    const handleNumChange = value => {
        onNumChange(value, index) 
    }

    const handleDenomChange = value => {
        onDenomChange (value, index)  
    }

    return (
        <div className='fraction'>
            <FractionPart value={numerator} onChange={handleNumChange} />
            <FractionPart value={denominator} onChange={handleDenomChange} />
        </div>
    )
}

Fraction.propTypes = {

}

export default Fraction

