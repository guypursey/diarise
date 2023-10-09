const prop = require("./prop.json");
const reqs = require("./reqs.json");
// TODO: Check NYC coverage after split to see if coverage of JSON is also handled
// TODO: Organise requirements into sections?

const chai = require("chai").should();
lookupDate = key => ({
        "key": key,
        "val": prop[key]
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