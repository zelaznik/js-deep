var deep = require("../index.js");

describe("deep.copy", function() {
    describe("primitives", function() {
        it("returns original value", function() {
            [3,'Steve',undefined,null,true,false].forEach(function(val) {
                expect(deep.copy(val)).toEqual(val);
            });
        });
    });

    describe("nested structures", function() {
        beforeEach(function() {
            orig = {x:3, y: {z: 4}};
            copy = deep.copy(orig);
        });

        it("the underlying values compare equal", function() {
            expect(copy.x).toEqual(3);
            expect(copy.y.z).toEqual(4);
        });

        it("the objects are not the same", function() {
            expect((copy.y === orig.y)).toEqual(false);
        });
    });

    describe("duplicate references to same object", function() {
        beforeEach(function() {
            orig = {x: [3]};
            orig.y = orig.x;
            copy = deep.copy(orig);
        });
        it("only copies the object once", function() {
            expect((copy.x === copy.y)).toEqual(true);
        });
        it("is not the same as the original object", function() {
            expect((copy.x === orig.x)).toEqual(false);
        });
    });
});