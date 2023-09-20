const prop = require("./prop.json");
const reqs = require("./reqs.json");
// TODO: Check NYC coverage after split to see if coverage of JSON is also handled

const chai = require("chai").should();
lookupDate = key => ({
        "key": key,
        "val": prop[key]
    });

describe("Checking two-way coverage", function () {
    let reqsSet = reqs.reduce((p, c) => {
        c.input.forEach(x => p.add(x));
        c.expected.forEach(x => p.add(x));
        return p;
    }, new Set());
    let propSet = new Set(Object.keys(prop));
    describe("to see that all values in the tests are proposed", function () {
        reqsSet.forEach(x => {
            it(`${x} proposal exists`, function() {
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

describe("Checking ordering of plain-text dates", function () {
    // TODO: Try splitting out into separate suites (basic requirements, advanced requirements)
    const tests = reqs;
    tests.forEach(({test, input, expected}) => {
        describe(test, function () {
            const processedInput = input.map(x => lookupDate(x))
            it("in ascending order", function () {
                const output = processedInput
                    .sort((x, y) => x.val.localeCompare(y.name))
                    .map(x => x.key);
                output.should.have.ordered.members(expected);
            });
            it("in descending order", function () {
                const output = processedInput
                    .sort((x, y) => y.val.localeCompare(x.name))
                    .map(x => x.key);
                output.should.have.ordered.members(expected.reverse());
            });
        });
    });
});

describe("Checking conversion of plain-text to date objects", function () {
    describe("does not work with usual JavaScript date object", function () {})
    describe("works with Diarise functions", function () {})
})