'use strict';

function deepEqual(x, y, level) {
    if(x === y) {
        return true;
    }

    if ((typeof(x) !== 'object') || (typeof(y) !== 'object')) {
        return false;
    }

    try {
        if (x.constructor !== y.constructor) {
            return false;
        }
    } catch(e) {
        return false;
    }

    if (x.length !== y.length) {
        return false;
    }

    for (var key in x) {
        if (!(key in y)) {
            return false;
        }
    }

    for (key in y) {
        if (!(key in x)) {
            return false;
        }
        if (!deepEqual(x[key], y[key])) {
            return false;
        }
    }

    return true;
}

module.exports = deepEqual;