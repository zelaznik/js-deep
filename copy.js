'use strict';

function passThrough(obj, mem, level) {
    return obj;
}

function iterate(orig, mem, level) {
    level = level || 0;
    var dup = new orig.constructor();
    for (var key in orig) {
        var val = orig[key];
        dup[key] = deepCopy(val, mem, level + 1);
    }
    return dup;
}

const types = Object.freeze({
    'string':    passThrough,
    'number':    passThrough,
    'boolean':   passThrough,
    'undefined': passThrough,
    'object':    iterate
});

function findOrCreateCache(obj, mem, level) {
    var k, i, tmpPair, pair, bucket, parsingErr;

    try {
        k = JSON.stringify(obj);
    } catch(e) {
        parsingErr = e;
    }

    if (k) {
        bucket = mem.cache[k] = (mem.cache[k] || []);
    } else {
        bucket = mem.err;
    }

    for (i in bucket) {
        tmpPair = bucket[i];
        if (obj === tmpPair.orig) {
            pair = tmpPair;
            break;
        }
    }

    if (pair === undefined) {
        pair = {orig: obj};
        bucket.push(pair);
    }

    return pair;
}

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
