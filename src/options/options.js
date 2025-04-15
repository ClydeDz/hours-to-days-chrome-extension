import {
  DEFAULT_HOURS_PER_DAY,
  DEFAULT_TOOLTIP_TIMEOUT,
  STORAGE_KEYS,
} from "../constants.js";

const hoursToDaysConfigForm = document.getElementById("hoursToDaysConfigForm");
const hoursPerDayInput = document.getElementById("hoursPerDayInput");
const tooltipTimeoutInput = document.getElementById("tooltipTimeoutInput");

document.addEventListener("DOMContentLoaded", () => {
  chrome.storage.sync.get(
    [STORAGE_KEYS.HOURS_PER_DAY, STORAGE_KEYS.TOOLTIP_TIMEOUT],
    (result) => {
      hoursPerDayInput.value = result[STORAGE_KEYS.HOURS_PER_DAY]
        ? result[STORAGE_KEYS.HOURS_PER_DAY]
        : DEFAULT_HOURS_PER_DAY;

      tooltipTimeoutInput.value = result[STORAGE_KEYS.TOOLTIP_TIMEOUT]
        ? result[STORAGE_KEYS.TOOLTIP_TIMEOUT]
        : DEFAULT_TOOLTIP_TIMEOUT;
    }
  );
});

hoursToDaysConfigForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const hoursPerDay = hoursPerDayInput.value
    ? hoursPerDayInput.value
    : DEFAULT_HOURS_PER_DAY;

  const tooltipTimeout = tooltipTimeoutInput.value
    ? tooltipTimeoutInput.value
    : DEFAULT_TOOLTIP_TIMEOUT;

  chrome.storage.sync.set({ hoursPerDay, tooltipTimeout }, () => {
    if (chrome.runtime.lastError) {
      showToastMessage("failure");
      return;
    }

    showToastMessage("success");
  });
});

function showToastMessage(type = "success") {
  const formSubmitBtn = document.getElementById("formSubmitBtn");
  formSubmitBtn.style.display = "none";

  const toastMessageContainer = document.getElementById(
    "toastMessageContainer"
  );

  while (toastMessageContainer.firstChild) {
    toastMessageContainer.removeChild(toastMessageContainer.firstChild);
  }

  const toastMessage = document.createElement("div");
  toastMessage.className = `toast-message toast-${type}`;
  toastMessage.id = "toastMessage";

  const toastMessageContents = document.createElement("span");
  toastMessageContents.innerText =
    type === "success" ? "Saved successfully" : "Failed to save";

  toastMessage.appendChild(toastMessageContents);

  toastMessageContainer.style.display = "block";
  toastMessageContainer.appendChild(toastMessage);

  setTimeout(() => {
    toastMessageContainer.style.display = "none";
    formSubmitBtn.style.display = "inline-block";

    while (toastMessageContainer.firstChild) {
      toastMessageContainer.removeChild(toastMessageContainer.firstChild);
    }
  }, 3000);
}
