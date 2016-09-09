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

module.exports = findOrCreateCache;