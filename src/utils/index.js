const transformNegative = ([n, d]) => n < 0 ? [n, Math.abs(d)] : [-n, Math.abs(d)] 
const isNegative = f => f.some(f => f < 0)
const toPositive = ([n, d]) => [Math.abs(n), Math.abs(d)]
export function calculate(fract1, sign, fract2) {
  if(sign === '-') {
  	if(isNegative(fract1) && isNegative(fract2)) {
	    fract1 = transformNegative(fract1)
      fract2 = toPositive(fract2)
      return calculate(fract1, '+', fract2)
    } else {
    	if(isNegative(fract1)) fract1 = transformNegative(fract1)
      else if(isNegative(fract2)) fract2 = transformNegative(fract2)
      const [n1, d1] = fract1
      const [n2, d2] = fract2
			if(d1 !== d2) {
      	const r = [n1*d2-n2*d1, d1*d2]
        return r
      } else {
      	const r = [n1-n2, d1]
        return r
      }
    }
  } else if (sign === '+') {
  	if(isNegative(fract1)) fract1 = transformNegative(fract1)
    if(isNegative(fract2)) fract2 = transformNegative(fract2)
    const [n1, d1] = fract1
    const [n2, d2] = fract2
    if(d1 !== d2) {
    	const r = [n1*d2 + n2*d1, d1*d2]
      return r;
    } else {
    	const r = [n1+n2, d1]
      return r;
    }
  } else if (sign === 'x') {
    if(isNegative(fract1)) fract1 = transformNegative(fract1)
    if(isNegative(fract2)) fract2 = transformNegative(fract2)
  	const [n1, d1] = fract1
    const [n2, d2] = fract2
    const r = [n1*n2, d1*d2]
    return r;
	} else if (sign === '/') {
  	[fract2[0], fract2[1]] = [fract2[1], fract2[0]]
    if(isNegative(fract1)) fract1 = transformNegative(fract1)
    if(isNegative(fract2)) fract2 = transformNegative(fract2)
    return calculate(fract1, 'x', fract2)
  }
}