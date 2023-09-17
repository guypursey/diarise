const chai = require("chai").should();
//const diarise = require("../src/index.js");

testDictionary = {
    "21st century":             "21C",
    "2020":                     "2020",
    "2020s (decade)":           "2020s",
    "2023":                     "2023",
    "Winter or Q1 2023":        "2023Q1",
    "January 2023":             "202301",
    "1st January 2023":         "20230101",
    "1st January 2023 + note":  "20230101: This is a note",
    "Noon on 1st January 2023": "202301011200",
    "2nd January 2023":         "20230102",
    "March 2023":               "202303",
    "Spring or Q2 2023":        "2023Q2",
    "April 2023":               "202304",
    "Summer or Q3 2023":        "2023Q3",
    "June 2023":                "202306"
};

lookupDate = key => ({
        "key": key,
        "val": testDictionary[key]
    });

describe("Checking ordering of plain-text dates", function () {
    const tests = [
        {
            test: "with two simple days",
            input: [ "2nd January 2023", "1st January 2023" ],
            expected: [ "1st January 2023", "2nd January 2023" ]
        }
    ];
    tests.forEach(({test, input, expected}) => {
        describe(test, function () {
            const processedInput = input.map(x => lookupDate(x))
            it("in ascending order", function () {
                const output = processedInput
                    .sort((x, y) => (x.val < y.val) ? -1 : ((x.val > y.val) ? 1 : 0))
                    .map(x => x.key)
                output.should.have.ordered.members(expected);
            })
            it("in descending order", function () {
                const output = processedInput
                    .sort((x, y) => (x.val < y.val) ? 1 : ((x.val > y.val) ? -1 : 0))
                    .map(x => x.key);
                output.should.have.ordered.members(expected.reverse());
            })
        })
    })
});

describe("Checking conversion of plain-text to date objects", function () {

})
