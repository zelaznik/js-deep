'use strict';

function deepKeySort(orig) {
  if (typeof(orig) !== 'object') {
    return orig;
  } else if (orig instanceof Array) {
    return orig;
  }

  try {
    var sortedKeys = Object.keys(orig).sort();
  } catch(e) {
    return orig;
  }

  var newObj = {};
  sortedKeys.forEach(function(key) {
    newObj[key] = deepKeySort(orig[key]);
  });
  return newObj;
}

module.exports = deepKeySort;