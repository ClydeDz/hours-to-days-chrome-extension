import { DEFAULT_HOURS_PER_DAY } from "./constants.js";

export function convertHoursToDays(
  selectedText,
  hoursPerDay = DEFAULT_HOURS_PER_DAY
) {
  if (hoursPerDay <= 0) return "Hours per day must be greater than 0";

  const numbers = selectedText.replace(/,/g, "").match(/-?\d+(\.\d+)?/);
  if (!numbers) return "Please select a number";

  const hours = parseFloat(numbers[0].replace(/,/g, ""));

  if (hours < 0 || hours > Number.MAX_SAFE_INTEGER)
    return `Please select a number greater than 0 and less than ${Number.MAX_SAFE_INTEGER}`;

  const days = Math.round((hours / hoursPerDay) * 2) / 2;
  return `${hours} hrs / ${hoursPerDay} hrs a day = ${days} days`;
}
