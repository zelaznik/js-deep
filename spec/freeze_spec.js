var deep = require("../index.js");

describe("deep.freeze", function() {
    describe("primitives", function() {
        it("returns original value", function() {
            [3,'Steve',undefined,null,true,false].forEach(function(val) {
                expect(deep.freeze(val) === val).toEqual(true);
            });
        });
    });

    describe("nested structures", function() {
        beforeEach(function() {
            orig = {x:3, y: {z: [4]}};
            frozen = deep.freeze(orig);
        });

        it("freeze the object and returns the original", function() {
            expect(orig === frozen).toEqual(true);
        });

        it("does not respond to new mutations", function() {
            frozen.x = null;
            frozen.y.z = null;
            expect(frozen.x).toEqual(3);
            expect(frozen.y.z[0]).toEqual(4);
        });
    });

    describe("duplicate references to same object", function() {
        beforeEach(function() {
            orig = {x: [3]};
            orig.y = orig.x;
            frozen = deep.freeze(orig);
        });
        it("only copies the object once", function() {
            expect((frozen.x === frozen.y)).toEqual(true);
        });
    });
});