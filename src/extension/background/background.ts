import {setUpReduxStore} from "@store/backgroundStore";
import {wrapStore} from "webext-redux";
import browser, {WebRequest} from "webextension-polyfill";
import {extractCanisterIdsFromSendHeaderDetails} from "@/core/service/icRequestResolver";
import {persistDetectedCanister} from "@store/slices/DetectedCanistersSlice";

const backgroundStore = setUpReduxStore();
wrapStore(backgroundStore);

export const persistCanisterIdsFromSendHeaders = (
    details: WebRequest.OnSendHeadersDetailsType
) => {
  const canisterIds: Set<string> =
      extractCanisterIdsFromSendHeaderDetails(details);
  canisterIds.forEach((canisterId) => {
    backgroundStore.dispatch(
        persistDetectedCanister({canisterId, tabId: details.tabId.toString()})
    );
  });
};

browser.webRequest.onSendHeaders.addListener(
    (details) => {
      persistCanisterIdsFromSendHeaders(details);
    },
    {urls: ["<all_urls>"]},
    ["extraHeaders"]
);
