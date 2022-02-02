import browser, {Tabs} from "webextension-polyfill";

export const getCurrentActiveBrowserTab = async (): Promise<Tabs.Tab> => {
  let queryOptions = {active: true, currentWindow: true};
  let [tab] = await browser.tabs.query(queryOptions);
  return tab
}