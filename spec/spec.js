const chai = require("chai").should();
//const diarise = require("../src/index.js");

testDictionary = {
    "January 2023":     "202301",
    "1st January 2023": "20230101",
    "2nd January 2023": "20230102"
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
        it(test, function () {
            const output = input.map(x => lookupDate(x))
                .sort((x, y) => (x.val < y.val) ? -1 : ((x.val > y.val) ? 1 : 0))
                .map(x => x.key);
            //console.log(output);
            output.should.have.ordered
                .members(expected);
        })
    })
});

describe("Checking conversion of plain-text to date objects", function () {

})
