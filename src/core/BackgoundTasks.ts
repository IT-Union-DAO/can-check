import browser, { WebRequest } from "webextension-polyfill";
import { extractCanisterIdsFromSendHeaderDetails } from "@/core/service/icRequestResolver";
import {
  disableTabToVerify,
  enableTabToVerify,
  persistDetectedCanister,
} from "@store/slices/CanistersForTabsSlice";

import { AppStore } from "@store/backgroundStore";

import { cleanUrl, isChromeExtensionUrl } from "@/core/service/utils";
import { ContentScriptMessages } from "./messages";
import { sendGreenNotificationAndExtensionIcon, sendYellowNotificationAndExtensionIcon } from "../../extension/popup/notifications";

export class BackgroundTasks {
  private backgroundStore: AppStore;

  constructor(store: AppStore) {
    this.backgroundStore = store;
  }

  init() {
    this.listenToContentScriptMessages();
    this.verifyCanistersOnPageLoad();
    this.listenToCanisterNetworkRequests();
  }

  listenToCanisterNetworkRequests() {
    browser.webRequest.onCompleted.addListener(
      async (details) => {
        await this.persistDetectedCanisters(details);
      },
      { urls: ["<all_urls>"] },
      ["extraHeaders"]
    );
  }

  /**
   * Notify background service
   * worker about verification popup completion
   */
  listenToContentScriptMessages() {
    browser.runtime.onMessage.addListener(async (message) => {
      switch (message.type) {
        case ContentScriptMessages.CANISTERS_CHECK_COMPLETE: {
          await this.notifyUserAboutCanistersState();
          break;
        }
      }
    });
  }

  /**
   * Should create a tab popup which verifies canisters which were stored in redux store
   */
  verifyCanistersOnPageLoad() {
    const listener = async (details) => {
      if (details.tabId && details.url) {
        const { urlsVsCanisters, tabToVerify } =
          this.backgroundStore.getState().detectedCanisterReducer;
        const cleanedUrl: string = cleanUrl(details.url);
        const isCurrentUrlRelatedToCanisters =
          Object.keys(urlsVsCanisters).includes(cleanedUrl);
        if (!isChromeExtensionUrl(cleanedUrl)) {
          if (
            tabToVerify.isEnabled === false &&
            isCurrentUrlRelatedToCanisters &&
            tabToVerify.url !== cleanedUrl
          ) {
            await this.createTabToVerifyCanister(details.tabId, cleanedUrl);
          }
        }
      }
    };
    browser.webNavigation.onCompleted.addListener(listener);
    browser.webNavigation.onHistoryStateUpdated.addListener(listener);
  }

  /**
   * Persist extracted canisters ids
   * (for Cover and Dab queries)
   * @param details
   */
  async persistDetectedCanisters(details: WebRequest.OnSendHeadersDetailsType) {
    //ignore requests from extension and verification tab
    if (
      details.initiator !== undefined &&
      !isChromeExtensionUrl(details.initiator) &&
      !isChromeExtensionUrl(details.url)
    ) {
      const initiatorUrl = details.initiator;
      const canisterIds: Set<string> =
        extractCanisterIdsFromSendHeaderDetails(details);
      canisterIds.forEach((id) => {
        this.backgroundStore.dispatch(
          persistDetectedCanister({
            canisterId: id,
            tabId: details.tabId.toString(),
            url: cleanUrl(initiatorUrl),
          })
        );
      });
    }
  }

  /**
   * Creates a popup which calls Cover and Dab to fetch data.
   * (Calling such services from current background service worker is not working)
   * @param tabId
   * @param url
   */
  async createTabToVerifyCanister(tabId: number, url: string) {
    this.backgroundStore.dispatch(
      enableTabToVerify({ tabId: tabId.toString(), url })
    );
    await browser.windows.create({
      url: "extension/popup/verification.html",
      type: "popup",
      height: 400,
      width: 480,
    });
  }

  /**
   * Currently we send notification and change icon extension color
   * depending on presence or absence of Cover metadata for particular canister
   */
  async notifyUserAboutCanistersState() {
    const { urlsVsCanisters } =
      this.backgroundStore.getState().detectedCanisterReducer;
    const { coverInfo } = this.backgroundStore.getState().coverInfoReducer;
    const { tabToVerify } =
      this.backgroundStore.getState().detectedCanisterReducer;
    const canisterIds: string[] = urlsVsCanisters[tabToVerify.url];
    let isOk: boolean = true;
    for (let canisterId in canisterIds) {
      if (!coverInfo?.canisterId?.exists) {
        // if at least 1 canister is not verified than icon label should be changed
        isOk = false;
        break;
      }
    }
    const tabId: number = parseInt(tabToVerify.tabId);
    if (isOk) {
      await sendGreenNotificationAndExtensionIcon(tabId, tabToVerify.url);
    } else {
      await sendYellowNotificationAndExtensionIcon(tabId, tabToVerify.url);
    }
    this.backgroundStore.dispatch(disableTabToVerify());
  }
}
