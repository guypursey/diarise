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
    // TODO: add some error or undefined logging here, perhaps via monad

describe("Checking ordering of plain-text dates", function () {
    const tests = [
        {
            test: "where one day should follow another",
            input: [ "2nd January 2023", "1st January 2023" ],
            expected: [ "1st January 2023", "2nd January 2023" ]
        },
        {
            test: "with a month representation and a day representation",
            input: [ "1st January 2023", "January 2023" ],
            expected: [ "January 2023", "1st January 2023" ]
        },
        {
            test: "with a year-resoluton date and a month-resolution date",
            input: [ "January 2023", "2023" ],
            expected: [ "2023", "January 2023" ]
        },
        {
            test: "with a decade-resolution date and three year-resolution dates straddling it",
            input: [ "2020s (decade)", "2019", "2020", "2021" ],
            expected: [ "2019", "2020s (decade)", "2020", "2021" ]
        },
        {
            test: "with a century-resolution date and decade-resolution date",
            input: [ "1900s (decade)", "1990s (century)" ],
            expected: [ "1900s (century)", "1900s (decade)" ]
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
    describe("does not work with usual JavaScript date object", function () {})
    describe("works with Diarise functions", function () {})
})