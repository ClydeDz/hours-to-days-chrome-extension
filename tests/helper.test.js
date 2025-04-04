import { convertHoursToDays } from "../src/helper";

describe("convertHoursToDays", () => {
  test.each([
    ["16 hours", "2 days"],
    ["191 hours", "24 days"],
    ["Available 74 Hours", "9.5 days"],
  ])("should convert %s to %s", (input, expectedOutput) => {
    var output = convertHoursToDays(input);
    expect(output).toBe(expectedOutput);
  });
});
