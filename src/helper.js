export function convertHoursToDays(selectedText) {
  const numbers = selectedText.replace(/,/g, "").match(/-?\d+(\.\d+)?/);
  if (!numbers) return null;

  const hours = parseFloat(numbers[0].replace(/,/g, ""));

  if (hours < 0) return "0 days";
  if (hours > 1000000000000000000) return "0 days";
  if (hours > Number.MAX_SAFE_INTEGER) return "0 days";

  const days = Math.round((hours / 8) * 2) / 2;
  return `${days} days`;
}
