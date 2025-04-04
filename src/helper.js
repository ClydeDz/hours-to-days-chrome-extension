export function convertHoursToDays(selectedText) {
  var numbers = selectedText.match(/\d+/g);
  if (!numbers) return null;

  var hours = numbers.join("");
  return `${Math.round((hours / 8) * 2) / 2} days`;
}
