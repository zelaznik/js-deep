'use strict';

var findOrCreateCache = require("./helpers/find_or_create_cache.js");

function passThrough(obj, mem, level) {
    return obj;
}

function iterate(orig, mem, level) {
    for (var key in orig) {
        var val = orig[key];
        orig[key] = deepFreeze(val, mem, level+1);
    }
    return Object.freeze(orig);
}

var types = Object.freeze({
    'string':    passThrough,
    'number':    passThrough,
    'boolean':   passThrough,
    'undefined': passThrough,
    'object':    iterate
});

function deepFreeze(obj, mem, level) {
    var pair, func;
    if (!obj) { return obj; }

    level = level || 0;
    mem = mem || {err: [], cache: {}};
    pair = findOrCreateCache(obj, mem, level);

    if (pair.frozen) {
        return pair.frozen;
    }

    func = types[typeof(obj)];
    if (func === undefined)
        throw new Error("Unknown type: " + typeof(obj));
    else {
        pair.frozen = func(obj, mem, level + 1);
        return pair.frozen;
    }
}

module.exports = deepFreeze;
