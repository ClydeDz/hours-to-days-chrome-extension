import { convertHoursToDays } from "./helper.js";

const CHROME_EXT_MENU_ID = "ConvertHoursToDaysMenuId";
const DEFAULT_HOURS_PER_DAY = 8;

chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: CHROME_EXT_MENU_ID,
    title: "Convert hours to days",
    contexts: ["selection"],
  });
});

chrome.action.onClicked.addListener(() => {
  chrome.runtime.openOptionsPage();
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId !== CHROME_EXT_MENU_ID) return;

  chrome.storage.sync.get(["hoursPerDay"], (result) => {
    const hoursPerDay = result.hoursPerDay
      ? result.hoursPerDay
      : DEFAULT_HOURS_PER_DAY;

    const days = convertHoursToDays(info.selectionText, hoursPerDay);

    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      func: showTooltip,
      args: [days],
    });

    chrome.scripting.insertCSS({
      target: { tabId: tab.id },
      files: ["background.css"],
    });
  });
});

function showTooltip(daysTooltipTextMessage) {
  if (!daysTooltipTextMessage) return;

  const tooltipCssId = "ConvertHoursToDaysChromeExtTooltip";

  const existing = document.getElementById(tooltipCssId);
  if (existing) existing.remove();

  const tooltip = document.createElement("div");
  tooltip.id = tooltipCssId;
  tooltip.textContent = daysTooltipTextMessage;

  const topPosition =
    window.getSelection().getRangeAt(0).getBoundingClientRect().top < 35
      ? window.getSelection().getRangeAt(0).getBoundingClientRect().top +
        window.getSelection().getRangeAt(0).getBoundingClientRect().height +
        5
      : window.getSelection().getRangeAt(0).getBoundingClientRect().top +
        window.scrollY -
        32;

  tooltip.style.top = `${topPosition}px`;

  const leftPosition =
    window.getSelection().getRangeAt(0).getBoundingClientRect().left +
    window.scrollX;

  tooltip.style.left = `${leftPosition}px`;

  document.body.appendChild(tooltip);

  setTimeout(() => tooltip.remove(), 3000);
}
