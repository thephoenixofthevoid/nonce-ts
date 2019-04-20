//
// Error messages
//
const errEndReached = $throw("Non cycled counter reached its maximal value");

function noop(){}

export function Counter(current,prefix: Buffer[] = [], oncycle: Function = errEndReached) {
    const cr = Array.isArray(current) ? [ ...current ] : $zero(current);
    const id = Buffer.concat(prefix)
    const sz = Object.freeze([ ...prefix.map(x => x.length), cr.length ])
    const ln = sz.reduce((x, y) => x+y)

    Object.freeze(prefix)

    return Object.assign(next, { sub, prefix, sizes: sz, id, byteLength: ln })
    
    function next() {
        if ($inc(cr)) oncycle();
        return Buffer.concat([ ...prefix, Buffer.from(cr) ])
    }

    function sub (n: number = 10, _oncycle: Function = noop) {
        if ($inc(cr)) oncycle();
        return Counter(n, [ ...prefix, Buffer.from(cr) ], _oncycle)
    }
}


/**
 * Implementation
 */

function $inc(array) {
  let i = array.length;
  while (--i >= 0) {
    if (++array[i] < 256) return false;
    array[i] = 0;
  }
  return true;
}

function $throw(message) {
  return () => {
    throw new Error(message)
  }
}

function $zero(n) {
    const c = [];
    while (c.length < n) c.push(0);
    return c;
}
