import { convertHoursToDays } from "../src/helper";

const HAPPY_PATH_TEST_CASES = [
  {
    input: "16 hours",
    expectedHours: "16",
    expectedOutput: "2",
    hoursPerDay: 8,
  },
  {
    input: "16 hours",
    expectedHours: "16",
    expectedOutput: "1.5",
    hoursPerDay: 10,
  },
  {
    input: "191 hours",
    expectedHours: "191",
    expectedOutput: "24",
    hoursPerDay: 8,
  },
  {
    input: "191 hours",
    expectedHours: "191",
    expectedOutput: "13.5",
    hoursPerDay: 14,
  },
  {
    input: "248.458 hours",
    expectedHours: "248.458",
    expectedOutput: "33",
    hoursPerDay: 7.5,
  },
  {
    input: "what is 4 plus 4?",
    expectedHours: "4",
    expectedOutput: "0.5",
    hoursPerDay: 8,
  },
  {
    input: "Available 74 Hours",
    expectedHours: "74",
    expectedOutput: "9.5",
    hoursPerDay: 8,
  },
  {
    input: "Balance of 128",
    expectedHours: "128",
    expectedOutput: "16",
    hoursPerDay: 8,
  },
  {
    input: "1,548",
    expectedHours: "1548",
    expectedOutput: "258",
    hoursPerDay: 6,
  },
  {
    input: "142568",
    expectedHours: "142568",
    expectedOutput: "17821",
    hoursPerDay: 8,
  },
  {
    input: "1,42,568",
    expectedHours: "142568",
    expectedOutput: "17821",
    hoursPerDay: 8,
  },
  { input: "0 hours", expectedHours: "0", expectedOutput: "0", hoursPerDay: 8 },
  {
    input: "1e3 hours",
    expectedHours: "1",
    expectedOutput: "0",
    hoursPerDay: 8,
  },
  {
    input: "1e-3 hours",
    expectedHours: "1",
    expectedOutput: "0",
    hoursPerDay: 8,
  },
  {
    input: `${Number.MAX_SAFE_INTEGER} hours`,
    expectedHours: `${Number.MAX_SAFE_INTEGER}`,
    expectedOutput: "1125899906842624",
    hoursPerDay: 8,
  },
];

describe("convertHoursToDays", () => {
  test.each(HAPPY_PATH_TEST_CASES)(
    "should convert $input to $expectedOutput days when $hoursPerDay hours per day",
    ({ input, expectedHours, expectedOutput, hoursPerDay }) => {
      const output = convertHoursToDays(input, hoursPerDay);
      expect(output).toBe(
        `${expectedHours} hrs / ${hoursPerDay} hrs a day = ${expectedOutput} days`
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

  test.each([[-8], [0], [-1]])(
    "should return greater than zero validation message when hours per day is %s",
    (input) => {
      var output = convertHoursToDays("121 hours", 0);
      expect(output).toBe(`Hours per day must be greater than 0`);
    }
  );
});
