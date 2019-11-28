import React, { useState, useEffect, memo } from 'react'
import PropTypes from 'prop-types'
import './index.css'

function Sign({ sign, onChange, index, placeholder }) {
    const [value, setValue] = useState(sign || placeholder)
    const isDisabled = sign === '='

    const handleChange = (evt) => {
        const [a, b] = evt.target.value
        const v = a && b ? b : a;
        setValue(v)
        onChange(v, index)
    }
    const cn = (standart, conditional) => 
        `${standart} ${Object.entries(conditional).reduce((r, [key, v]) => v ? r + key : r, '')}`

    const classNames = cn('sign', {
        disabled: isDisabled
    })
    return (
        <input 
            maxLength='2' 
            disabled={isDisabled} 
            onChange={handleChange} 
            className={classNames} 
            type='text' 
            value={value} 
        />
    )
}

Sign.propTypes = {
    sign: PropTypes.string
}

export default memo(Sign)

