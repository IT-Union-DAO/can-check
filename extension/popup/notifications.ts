import browser from "webextension-polyfill";

export async function sendGreenNotificationAndExtensionIcon(
  tabId: number,
  url: string
) {
  await browser.notifications.create({
    type: "basic",
    iconUrl: "extension/icons/green16.png",
    title: "Canisters verified!",
    message: `Code verification has successfully passed for ${url}`,
  });
  await browser.action.setIcon({
    tabId: tabId,
    path: "extension/icons/green16.png",
  });
}

export async function sendYellowNotificationAndExtensionIcon(
  tabId: number,
  url: string
) {
  await browser.notifications.create({
    type: "basic",
    iconUrl: "extension/icons/yellow16.png",
    title: "Unknown canisters!",
    message: `Some canisters are unCOVERed on ${url}`,
  });

  await browser.action.setIcon({
    tabId: tabId,
    path: "extension/icons/yellow16.png",
  });
}
