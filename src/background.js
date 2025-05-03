import {
  DEFAULT_HOURS_PER_DAY,
  DEFAULT_TOOLTIP_MESSAGE,
  DEFAULT_TOOLTIP_TIMEOUT,
  STORAGE_KEYS,
} from "./constants.js";
import { convertHoursToDays } from "./helper.js";

const CHROME_EXT_MENU_ID = "ConvertHoursToDaysMenuId";

chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: CHROME_EXT_MENU_ID,
    title: "Convert hours to days",
    contexts: ["selection"],
    documentUrlPatterns: ["https://*/*", "http://*/*", "file://*/*"],
  });
});

chrome.action.onClicked.addListener(() => {
  chrome.runtime.openOptionsPage();
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId !== CHROME_EXT_MENU_ID) return;

  if (tab.id === -1) return;

  chrome.storage.sync.get(
    [STORAGE_KEYS.HOURS_PER_DAY, STORAGE_KEYS.TOOLTIP_TIMEOUT],
    (result) => {
      const hoursPerDay = result[STORAGE_KEYS.HOURS_PER_DAY]
        ? result[STORAGE_KEYS.HOURS_PER_DAY]
        : DEFAULT_HOURS_PER_DAY;

      const tooltipTimeout = result[STORAGE_KEYS.TOOLTIP_TIMEOUT]
        ? result[STORAGE_KEYS.TOOLTIP_TIMEOUT]
        : DEFAULT_TOOLTIP_TIMEOUT;

      const tooltipMessage = convertHoursToDays(
        info.selectionText,
        hoursPerDay
      );

      chrome.scripting.executeScript({
        target: { tabId: tab.id },
        func: showTooltip,
        args: [tooltipMessage, tooltipTimeout],
      });

      chrome.scripting.insertCSS({
        target: { tabId: tab.id },
        files: ["background.css"],
      });
    }
  );
});

function showTooltip(
  tooltipMessage = DEFAULT_TOOLTIP_MESSAGE,
  tooltipTimeout = DEFAULT_TOOLTIP_TIMEOUT
) {
  const tooltipElementId = "ConvertHoursToDaysChromeExtTooltip";
  const existingElement = document.getElementById(tooltipElementId);

  if (existingElement) existingElement.remove();

  const tooltip = document.createElement("div");
  tooltip.id = tooltipElementId;
  tooltip.textContent = tooltipMessage;

  const topPosition =
    window.getSelection().getRangeAt(0).getBoundingClientRect().top < 35
      ? window.getSelection().getRangeAt(0).getBoundingClientRect().top +
        window.getSelection().getRangeAt(0).getBoundingClientRect().height +
        5
      : window.getSelection().getRangeAt(0).getBoundingClientRect().top +
        window.scrollY -
        50;

  tooltip.style.top = `${topPosition}px`;

  const leftPosition =
    window.getSelection().getRangeAt(0).getBoundingClientRect().left +
    window.scrollX;

  tooltip.style.left = `${leftPosition}px`;

  document.body.appendChild(tooltip);

  setTimeout(() => tooltip.remove(), tooltipTimeout * 1000);
}
