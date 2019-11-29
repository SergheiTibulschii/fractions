import { calculate } from './index'
const priority = {'+': 'low', '-': 'low', "/": 'high', '*': 'high'}

var prioritizeSigns = signs => signs.map((s, i) => ({
	i,
	s,
  p: priority[s]
}))
var sortSigns = signs => Array.from(signs.sort((a,b) => a.p === 'high' && a.i < b.i ? -1 : 1)) 
var mergeFractionsAndSigns = (fractions, signs) => fractions.reduce((r, x, i) => {
	if(i === 0) {
  	r.push(x)
    return r
  }
  return [...r,signs.shift(), x]
},[])

function operator(merged, sortedSigns) {
    const {s} = sortedSigns.shift()
    const signIndex = merged.indexOf(s)
    const keyIndex = signIndex-1
    const operands = merged.splice(keyIndex, 3)
    const result = calculate(...operands)
    console.log(result)
    merged.splice(keyIndex, 0, result)
    
    return merged.length === 1 ? result : operator(merged, sortedSigns)
}

export function process(fractions, signs) {
    const data = JSON.parse(fractions)
    const merged = mergeFractionsAndSigns(data, Array.from(signs))
    const prioritizedSigns = prioritizeSigns(Array.from(signs))
    const sortedByPriority = sortSigns(prioritizedSigns)
    const result = operator(merged, sortedByPriority)
    return result
}