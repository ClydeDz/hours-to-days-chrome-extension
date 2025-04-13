import { DEFAULT_HOURS_PER_DAY } from "../constants.js";

const form = document.getElementById("options-form");
const hoursInput = document.getElementById("hours-per-day");

// Load saved value
document.addEventListener("DOMContentLoaded", () => {
  chrome.storage.sync.get(["hoursPerDay"], (result) => {
    hoursInput.value = result.hoursPerDay
      ? result.hoursPerDay
      : DEFAULT_HOURS_PER_DAY;
  });
});

// Save value on form submit
form.addEventListener("submit", (event) => {
  event.preventDefault();
  const hoursPerDay = hoursInput.value
    ? hoursInput.value
    : DEFAULT_HOURS_PER_DAY;
  chrome.storage.sync.set({ hoursPerDay }, () => {
    alert("Options saved!");
  });
});
