import { convertHoursToDays } from "../src/helper";

describe("convertHoursToDays", () => {
  test.each([
    ["16 hours", "2 days"],
    ["191 hours", "24 days"],
    ["248.458 hours", "31 days"],
    ["what is 4 plus 4?", "0.5 days"],
    ["Available 74 Hours", "9.5 days"],
    ["Balance of 128", "16 days"],
    ["1,548", "193.5 days"],
    ["142568", "17821 days"],
    ["1,42,568", "17821 days"],
    ["No number here", null],
    ["", null],
    ["@#(*^$#", null],
    ["....", null],
    ["0 hours", "0 days"],
    ["-8 hours", "0 days"],
    ["1e3 hours", "0 days"],
    ["1e-3 hours", "0 days"],
    ["999999999999999999999 hours", "0 days"],
    ["1000000000000000001 hours", "0 days"],
  ])("should convert %s to %s", (input, expectedOutput) => {
    var output = convertHoursToDays(input);
    expect(output).toBe(expectedOutput);
  });
});
