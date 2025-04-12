export function convertHoursToDays(selectedText) {
  const numbers = selectedText.replace(/,/g, "").match(/-?\d+(\.\d+)?/);
  if (!numbers) return "Please select a number";

  const hours = parseFloat(numbers[0].replace(/,/g, ""));

  if (hours < 0 || hours > Number.MAX_SAFE_INTEGER)
    return `Please select a number greater than 0 and less than ${Number.MAX_SAFE_INTEGER}`;

  const days = Math.round((hours / 8) * 2) / 2;
  return `${hours} hrs / 8 hrs a day = ${days} days`;
}
