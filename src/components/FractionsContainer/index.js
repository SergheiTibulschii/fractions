import React, { useState, useEffect, useCallback } from 'react'
import PropTypes from 'prop-types'

import Fraction from '../Fraction'
import Sign from '../Sign'
import './index.css'

import { calculate } from '../../utils'

const fracts = [
    [3, 5], [5,7], [5,9]
]
const constraints = ['+', '/', '-', 'x']
const signPriority = {
    low: ['+', '-'],
    high: ['/', 'x']
}
function FractionsContainer(props) {
    const [fractions, setFractions] = useState(fracts)
    const [numResult, setNumResult] = useState('?')
    const [denomResult, setDenomResult] = useState('?')
    const [signs, setSigns] = useState([])
    const [error, setError] = useState('');

    useEffect(() => {
        if(fractions.length - 1 === signs.filter(s => s).length) {
            const [n ,d] = calculate(fractions[0], signs[0], fractions[1])
            console.log(n, d)
            // setNumResult(n)
            // setDenomResult(d)
        }
        else {
            setNumResult('?')
            setDenomResult('?')
        }
    }, [fractions, signs])

    const prepareGroups = (fractionList, signList) => {
        
    }

    const handleDenomChange = (evt, index) => {
        const { value } = evt.target
        setFractions(fractions.map(([n, d], i) => i === index ? [n, +value] : [n, d]))
    }

    const handleNumChange = (evt, index) => {
        const { value } = evt.target
        setFractions(fractions.map(([n, d], i) => i === index ? [+value, d] : [n, d]))
    }

    const addFraction = () => {
        setFractions([...fractions, ['?', '?']])
    }

    const handleSignChange = useCallback((value, index) => {
        const c = Array.from(signs)
        if(constraints.includes(value)) {
            c[index] = value
            setError('')
        } else {
            c[index] = ''
            setError(`Please use one of the following signs ${constraints.join(',')}`)
        }
        setSigns(c)
    })

    return (
        <div>
            <div>{error}</div>
            <div className='fraction-container'>
                {
                    fractions.map(([num, denom], index) => (
                        <>
                            <Fraction
                                key={index}
                                index={index}
                                numerator={num}
                                denominator={denom}
                                onDenomChange={handleDenomChange}
                                onNumChange={handleNumChange}
                            />
                            {
                                index !== fractions.length - 1 && (
                                    <Sign
                                        placeholder='?'
                                        onChange={handleSignChange} 
                                        sign={signs[index]} 
                                        key={`sign-${index}`} 
                                        index={index}
                                    />
                                )
                            }
                        </>
                    ))
                }
                <Sign sign='='/>
                <Fraction
                    key='result-fract'
                    numerator={numResult}
                    denominator={denomResult}
                />
            </div>
            <button id='add-fraction' onClick={addFraction}>Add fraction</button>
        </div>
    )
}

FractionsContainer.propTypes = {

}

export default FractionsContainer

