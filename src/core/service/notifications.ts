import browser from "webextension-polyfill";

export async function sendGreenNotificationAndExtensionIcon(tabId: number, url: string) {
  await browser.notifications.create({
    type: "basic",
    iconUrl: "extension/assets/icon/green16.png",
    title: "Canisters verified!",
    message: `Code verification has successfully passed for ${url}`
  })
  await browser.action.setIcon({
    tabId: tabId,
    path: "extension/assets/icon/green16.png"
  })
}

export async function sendYellowNotificationAndExtensionIcon(tabId: number, url: string) {
  await browser.notifications.create({
    type: "basic",
    iconUrl: "extension/assets/icon/yellow16.png",
    title: "Unknown canisters!",
    message: `Some canisters are unCOVERed on ${url}`
  })

  await browser.action.setIcon({
    tabId: tabId,
    path: "extension/assets/icon/yellow16.png"
  })
}

