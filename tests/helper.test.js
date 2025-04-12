import { convertHoursToDays } from "../src/helper";

describe("convertHoursToDays", () => {
  test.each([
    { input: "16 hours", expectedHours: "16", expectedOutput: "2" },
    { input: "191 hours", expectedHours: "191", expectedOutput: "24" },
    { input: "248.458 hours", expectedHours: "248.458", expectedOutput: "31" },
    { input: "what is 4 plus 4?", expectedHours: "4", expectedOutput: "0.5" },
    { input: "Available 74 Hours", expectedHours: "74", expectedOutput: "9.5" },
    { input: "Balance of 128", expectedHours: "128", expectedOutput: "16" },
    { input: "1,548", expectedHours: "1548", expectedOutput: "193.5" },
    { input: "142568", expectedHours: "142568", expectedOutput: "17821" },
    { input: "1,42,568", expectedHours: "142568", expectedOutput: "17821" },
    { input: "0 hours", expectedHours: "0", expectedOutput: "0" },
    { input: "1e3 hours", expectedHours: "1", expectedOutput: "0" },
    { input: "1e-3 hours", expectedHours: "1", expectedOutput: "0" },
    {
      input: `${Number.MAX_SAFE_INTEGER} hours`,
      expectedHours: `${Number.MAX_SAFE_INTEGER}`,
      expectedOutput: "1125899906842624",
    },
  ])(
    "should convert $input to $expectedOutput days",
    ({ input, expectedHours, expectedOutput }) => {
      const output = convertHoursToDays(input);
      expect(output).toBe(
        `${expectedHours} hrs / 8 hrs a day = ${expectedOutput} days`
      );
    }
  );

  test.each([["No number here"], [""], ["@#(*^$#"], ["...."]])(
    "should return validation message for %s",
    (input) => {
      var output = convertHoursToDays(input);
      expect(output).toBe("Please select a number");
    }
  );

  test.each([
    ["-8 hours"],
    ["999999999999999999999 hours"],
    ["1000000000000000001 hours"],
    [`${Number.MAX_SAFE_INTEGER + 1} hours`],
  ])("should return range validation message for %s", (input) => {
    var output = convertHoursToDays(input);
    expect(output).toBe(
      `Please select a number greater than 0 and less than ${Number.MAX_SAFE_INTEGER}`
    );
  });
});
