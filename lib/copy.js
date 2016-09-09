'use strict';

var findOrCreateCache = require("./helpers/find_or_create_cache.js");

function passThrough(obj, mem, level) {
    return obj;
}

function iterate(orig, mem, level) {
    var dup = new orig.constructor();
    for (var key in orig) {
        var val = orig[key];
        dup[key] = deepCopy(val, mem, level + 1);
    }
    return dup;
}

var types = Object.freeze({
    'string':    passThrough,
    'number':    passThrough,
    'boolean':   passThrough,
    'undefined': passThrough,
    'object':    iterate
});

function deepCopy(obj, mem, level) {
    var pair, func;
    if (!obj) { return obj; }

    level = level || 0;
    mem = mem || {err: [], cache: {}};
    pair = findOrCreateCache(obj, mem, level);

    if (pair.copy) {
        return pair.copy;
    }

    func = types[typeof(obj)];
    if (func === undefined)
        throw new Error("Unknown type: " + typeof(obj));
    else {
        pair.copy = func(obj, mem, level + 1);
        return pair.copy;
    }
}

module.exports = deepCopy;
