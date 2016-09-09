var deep = require("../index.js");

describe("deep.equal", function() {
    describe("when mixing objects and arrays", function() {
        it("can tell the difference between the two", function() {
            var obj = {};
            var arr = [];
        'abcdefghijklm'.split('').forEach(function(letter, i) {
            obj[i] = letter;
            arr[i] = letter;
        });
        expect(deep.equal(obj, arr)).toEqual(false);
        });
    });

    describe("when comparing two objects", function() {
        beforeEach(function() {
            x = {};
            y = {};
            'abcdefghijklm'.split('').forEach(function(letter, i) {
                x[letter] = i;
            });
            "lgfakcehdibmj".split("").forEach(function(letter) {
                y[letter] = x[letter];
            });
        });
        it("two equivalent objects to compare true, regardless of order", function() {
            expect(deep.equal(x, y)).toEqual(true);
        });
        it("notices differences in the values", function() {
            y.a = null;
            expect(deep.equal(x, y)).toEqual(false);
        });
        it("returns false when lengths are different", function() {
            delete y.a;
            expect(deep.equal(x, y)).toEqual(false);
        });
    });
});

