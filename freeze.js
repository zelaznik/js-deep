'use strict';

function passThrough(obj) {
    return obj;
}

function iterate(orig, level) {
    for (var key in orig) {
        var val = orig[key];
        orig[key] = deepFreeze(val, level+1);
    }
    return Object.freeze(orig);
}

const types = Object.freeze({
    'string':    passThrough,
    'number':    passThrough,
    'boolean':   passThrough,
    'undefined': passThrough,
    'object':    iterate
});

function deepFreeze(obj, level) {
    if (!obj)
        return obj;
    if (level >= 100)
        throw new Error("max recursion level reached.");

    var func = types[typeof(obj)];
    if (func === undefined)
        throw new Error("Unknown type: " + typeof(obj));
    else
        return func(obj, (level || 0) + 1);
}

module.exports = deepFreeze;
