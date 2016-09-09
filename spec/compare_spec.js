var deep = require("../index.js");

describe("deep.compare", function() {
    describe("context: primitive types only", function() {
        it("returns -1 if the left operand is less than the right", function() {
            expect(deep.compare(3, 4)).toEqual(-1);
        });
        it("returns 0 if the left operand is equal to the right", function() {
            expect(deep.compare(4, 4)).toEqual(0);
        });
        it("returns 1 if the left operand is greater than the right", function() {
            expect(deep.compare(5, 4)).toEqual(1);
        });
        it("fails on poorly defined comparisons such as null <=> 0", function() {
            expect(function() { deep.compare(0, null); }).toThrow();
        });
    });
    describe("context: nested structures", function() {
        it("the leftmost values take precedence", function() {
            expect(deep.compare([1,0],[0,9])).toEqual(1);
        });
        it("the shorter array compares less than the longer one", function() {
            expect(deep.compare([5], [5, Infinity])).toEqual(-1);
        });
        it("returns 0 on deeply nested structures that are equal", function() {
            expect(deep.compare([3,[1,[4,[1,5]]]], [3,[1,[4,[1,5]]]])).toEqual(0);
        });
    });
});