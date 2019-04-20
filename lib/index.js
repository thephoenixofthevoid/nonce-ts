"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const isArray = Array.isArray;
const freeze = Object.freeze;
const assign = Object.assign;
const concat = Buffer.concat;
const buffer = Buffer.from;
const zeros = freeze([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
const ERR_END_REACHED = "Non cycled counter reached its maximal value";
const ERR_AMBIGUILTIES = "Cannot define sublevels with different sizes due to indexing ambiguities";
function noop() { }
function Counter(current, prefix = [], oncycle = $throw(ERR_END_REACHED)) {
    const c = isArray(current) ? [...current] : $zero(current);
    freeze(prefix);
    var size = null;
    return assign(next, { sub, prefix, sizes });
    function next() {
        if ($inc(c))
            oncycle();
        return concat([...prefix, buffer(c)]);
    }
    function sub(n = null, _oncycle = noop) {
        if (n && size && n !== size)
            throw new Error(ERR_AMBIGUILTIES);
        if ($inc(c))
            oncycle();
        return Counter(size = n || 10, [...prefix, buffer(c)], _oncycle);
    }
    function sizes() {
        return [...prefix.map(x => x.length), c.length];
    }
}
exports.Counter = Counter;
function $inc(array) {
    let i = array.length;
    while (--i >= 0) {
        if (++array[i] < 256)
            return false;
        array[i] = 0;
    }
    return true;
}
function $throw(message) {
    return () => {
        throw new Error(message);
    };
}
function $zero(n) {
    const c = zeros.slice(0, n);
    while (c.length < n)
        c.push(0);
    return c;
}
