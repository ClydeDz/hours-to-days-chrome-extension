import {
  DEFAULT_HOURS_PER_DAY,
  DEFAULT_TOOLTIP_TIMEOUT,
  STORAGE_KEYS,
} from "../constants.js";

const form = document.getElementById("hoursToDaysConfigForm");
const hoursInput = document.getElementById("hours-per-day");
const tooltipTimeoutInput = document.getElementById("tooltip-timeout");

document.addEventListener("DOMContentLoaded", () => {
  chrome.storage.sync.get(
    [STORAGE_KEYS.HOURS_PER_DAY, STORAGE_KEYS.TOOLTIP_TIMEOUT],
    (result) => {
      hoursInput.value = result[STORAGE_KEYS.HOURS_PER_DAY]
        ? result[STORAGE_KEYS.HOURS_PER_DAY]
        : DEFAULT_HOURS_PER_DAY;

      tooltipTimeoutInput.value = result[STORAGE_KEYS.TOOLTIP_TIMEOUT]
        ? result[STORAGE_KEYS.TOOLTIP_TIMEOUT]
        : DEFAULT_TOOLTIP_TIMEOUT;
    }
  );
});

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const hoursPerDay = hoursInput.value
    ? hoursInput.value
    : DEFAULT_HOURS_PER_DAY;

  const tooltipTimeout = tooltipTimeoutInput.value
    ? tooltipTimeoutInput.value
    : DEFAULT_TOOLTIP_TIMEOUT;

  chrome.storage.sync.set({ hoursPerDay, tooltipTimeout }, () => {
    console.log(hoursPerDay, tooltipTimeout);
    if (!chrome.runtime.lastError) {
      triggerSuccessAnimation();
      return;
    }

    triggerFailureAnimation();
  });
});

function triggerSuccessAnimation() {
  const successToast = document.getElementById("successToast");
  const formSubmitBtn = document.getElementById("formSubmitBtn");

  successToast.style.display = "block";
  formSubmitBtn.style.display = "none";

  // Select the success message element
  const successMessage = document.querySelector(".options-form-success");

  // Reset the animation by removing the class (if it exists)
  successMessage.classList.remove("animate-success");

  // Force reflow to restart the animation
  void successMessage.offsetWidth;

  // Add the animation class
  successMessage.classList.add("animate-success");

  setTimeout(() => {
    successToast.style.display = "none";
    formSubmitBtn.style.display = "inline-block";
  }, 3000);
}

function triggerFailureAnimation() {
  const failureToast = document.getElementById("failureToast");
  const formSubmitBtn = document.getElementById("formSubmitBtn");

  failureToast.style.display = "block";
  formSubmitBtn.style.display = "none";

  // Select the success message element
  const failureMessage = document.querySelector(".options-form-failure");

  // Reset the animation by removing the class (if it exists)
  failureMessage.classList.remove("animate-failure");

  // Force reflow to restart the animation
  void failureMessage.offsetWidth;

  // Add the animation class
  failureMessage.classList.add("animate-failure");

  setTimeout(() => {
    failureToast.style.display = "none";
    formSubmitBtn.style.display = "inline-block";
  }, 3000);
}
