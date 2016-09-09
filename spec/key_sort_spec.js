var deep = require("../index.js");

describe("deep.keySort", function() {
    it("ignores arrays", function() {
      var orig = [9,8,7,6,5];
      expect(JSON.stringify(deep.keySort(orig))).toEqual('[9,8,7,6,5]')
    });

    it("reorders object keys", function() {
      var orig = {};
      orig.z = 5;
      orig.y = 4;
      orig.x = 3;
      expect(JSON.stringify(deep.keySort(orig))).toEqual('{"x":3,"y":4,"z":5}');
    });

    it("returns a new object", function() {
      var orig = {};
      orig.z = 5;
      orig.y = 4;
      orig.x = 3;
      expect(deep.keySort(orig) === orig).toEqual(false);
    });
});