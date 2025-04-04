import { convertHoursToDays } from "./helper.js";

chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: "myMenuItem",
    title: "My Context Menu Item",
    contexts: ["selection"],
  });
});

// export const convertHoursToDays = (selectedText) => {
//   var hours = selectedText;
//   return Math.round(hours / 8);
// };

// function convertHoursToDays(selectedText) {
//   var numbers = selectedText.match(/\d+/g);
//   if (!numbers) return null;

//   var hours = numbers.join("");
//   return `${Math.round((hours / 8) * 2) / 2} days`;
// }

chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId !== "myMenuItem") return;

  var days = convertHoursToDays(info.selectionText);
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    func: showTooltip,
    args: [days],
  });
});

function showTooltip(daysTooltipTextMessage) {
  if (!daysTooltipTextMessage) return;

  const existing = document.getElementById("tooltip-extension");
  if (existing) existing.remove();

  const tooltip = document.createElement("div");
  tooltip.id = "tooltip-extension";
  tooltip.textContent = daysTooltipTextMessage;
  tooltip.style.position = "absolute";
  tooltip.style.background = "#000000";
  tooltip.style.border = "0";
  tooltip.style.padding = "5px 20px";
  tooltip.style.borderRadius = "100px";
  tooltip.style.fontFamily = "system-ui";
  tooltip.style.color = "white";
  tooltip.style.zIndex = 9999;
  console.log(
    window.getSelection().getRangeAt(0).getBoundingClientRect().top,
    window.getSelection().getRangeAt(0).getBoundingClientRect().height,
    window.scrollY
  );

  var topPosition =
    window.getSelection().getRangeAt(0).getBoundingClientRect().top < 35
      ? window.getSelection().getRangeAt(0).getBoundingClientRect().top +
        window.getSelection().getRangeAt(0).getBoundingClientRect().height +
        5
      : window.getSelection().getRangeAt(0).getBoundingClientRect().top;
  tooltip.style.top = `${
    topPosition
    // window.getSelection().getRangeAt(0).getBoundingClientRect().top +
    // window.scrollY -
    // 3
  }px`;
  tooltip.style.left = `${
    window.getSelection().getRangeAt(0).getBoundingClientRect().left +
    window.scrollX
  }px`;

  document.body.appendChild(tooltip);

  setTimeout(() => tooltip.remove(), 3000);
}

// // Add bubble to the top of the page.
// var bubbleDOM = document.createElement("div");
// bubbleDOM.setAttribute("class", "selection_bubble");
// document.body.appendChild(bubbleDOM);
// console.log("Context menu item clicked!", bubbleDOM);

// // Lets listen to mouseup DOM events.
// document.addEventListener(
//   "mouseup",
//   function (e) {
//     var selection = window.getSelection().toString();
//     if (selection.length > 0) {
//       console.log("Context menu item clicked!");
//       renderBubble(e.clientX, e.clientY, selection);
//     }
//   },
//   false
// );

// // Close the bubble when we click on the screen.
// document.addEventListener(
//   "mousedown",
//   function (e) {
//     bubbleDOM.style.visibility = "hidden";
//   },
//   false
// );

// // Move that bubble to the appropriate location.
// function renderBubble(mouseX, mouseY, selection) {
//   bubbleDOM.innerHTML = selection;
//   bubbleDOM.style.top = mouseY + "px";
//   bubbleDOM.style.left = mouseX + "px";
//   bubbleDOM.style.visibility = "visible";
// }
// "content_scripts": [
//     {
//       "matches": [
//         "http://*/*"
//       ],
//       "css": [
//         "background.css"
//       ],
//       "js": [
//         "background.js"
//       ],
//       "run_at": "document_end",
//       "all_frames": true
//     }
//   ]
