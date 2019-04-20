const isArray = Array.isArray;
const freeze = Object.freeze;
const assign = Object.assign;
const concat = Buffer.concat;
const buffer = Buffer.from;

const zeros = freeze([ 0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
  		       0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0 ])

//
// Error messages
//
const ERR_END_REACHED  = "Non cycled counter reached its maximal value";

function noop(){}

assign(Counter, { Sub });

export function Counter (current, prefix: Buffer[] = [], oncycle: Function = $throw(ERR_END_REACHED)) {
    const c = isArray(current) ? [ ...current ] : $zero(current);
    freeze(prefix)

    return assign(next, { sub, prefix, sizes })
    
    function next() {
        if ($inc(c)) oncycle();
        return concat([ ...prefix, buffer(c) ])
    }

    function sub (n: number = 10, _oncycle: Function = noop) {
        if ($inc(c)) oncycle();
        return Counter(n, [ ...prefix, buffer(c) ], _oncycle)
    }

   
    function sizes() {
      return [ ...prefix.map(x => x.length), c.length ];
    }
}


function Sub(n: number = 10, prefix: Buffer[] = [], _oncycle: Function = noop) {

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
    const c = zeros.slice(0, n);
    while (c.length < n) c.push(0);
    return c;
}
