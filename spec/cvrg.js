const prop = require("./prop.json");
const reqs = require("./reqs.json");
// TODO: Add basic check of UTF8 ref file by randomising and resorting.
// TODO: Separate two-way coverage out so it can be run as a standalone test as well as part of the suite.

const chai = require("chai").should();

describe("Checking two-way coverage", function () {
    let reqsSet = reqs.reduce((p, c) => {
        c.input.forEach(x => p.add(x));
        c.expected.forEach(x => p.add(x));
        return p;
    }, new Set());
    let propSet = new Set(Object.keys(prop));
    describe("to see that all values in the tests are proposed", function () {
        reqsSet.forEach(x => {
            it(`${x} proposal exists`, function () {
                propSet.should.include(x);
            });
        });
    });
    describe("to see that all values in the proposal are tested", function () {
        propSet.forEach(x => {
            it(`${x} is accounted for in test`, function () {
                reqsSet.should.include(x);
            });
        });
    });
});

