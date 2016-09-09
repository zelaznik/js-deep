'use strict';

function not(v) {
  return !v;
}

function cmp(x, y) {
  var lt = (x < y),
      gt = (x > y),
      eq = (x === y);

  if (lt && not(eq) && not(gt)) {
    return -1;
  } else if (not(lt) && eq && not(gt)) {
    return 0;
  } else if (not(eq) && not(lt) && gt) {
    return 1;
  } else {
    throw new TypeError("Cannot compare " + x + " with " + y + ".");    
  }
}

function deepArrayCompare(x, y) {
  var arrX = (x instanceof Array),
      arrY = (y instanceof Array);

  if (arrX !== arrY) {
    throw new TypeError("This function cannot compare an array to a non-array.");
  }

  var objX = ((!arrX) && (x instanceof Object)),
      objY = ((!arrY) && (y instanceof Object));

  if (objX || objY) {
    throw new TypeError("This function cannot perform inequalities on javascript objects.");
  }

  if ((!arrX) && (!arrY)) {
    return cmp(x, y);
  }

  for (var i=0, n=Math.min(x.length, y.length); i<n; i++) {
    subResult = deepArrayCompare(x[i], y[i]);
    if (subResult !== 0) {
      return subResult;
    }
  }

  if (x.length < y.length) {
    return -1;
  } else if (x.length === y.length) {
    return 0;
  } else if (x.length > y.length) {
    return 1;
  } else {
    throw new Error("An unknown error has occurred.");    
  }
}

module.exports = deepArrayCompare;