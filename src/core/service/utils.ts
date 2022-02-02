import browser, {Tabs} from "webextension-polyfill";

const urlPattern = RegExp("https://[A-Za-z0-9-]+(\\.[A-Za-z0-9-]+)*(\\.[A-Za-z]{2,})")
const chromePattern = RegExp("chrome-extension://")

export const getCurrentActiveBrowserTab = async (): Promise<Tabs.Tab> => {
  let queryOptions = {active: true, currentWindow: true};
  let [tab] = await browser.tabs.query(queryOptions);
  return tab
}

export const cleanUrl = (url: string): string => {
  return urlPattern.exec(url)[0]
}

export const isChromeExtensionUrl = (url: string): boolean => {
  return chromePattern.test(url)
}
