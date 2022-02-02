import { defineManifest } from "rollup-plugin-chrome-extension";
export default defineManifest({
  manifest_version: 3,
  name: "Can-Check",
  version: "0.0.1",
  description:
    "Extension for canister metadata verification on Internet Computer",
  action: {
    default_popup: "extension/popup/index.html",
    verify_popup: "extension/popup/verification.html",
  },
  icons: {
    "16": "extension/icons/blue16.png",
    "48": "extension/icons/blue48.png",
    "128": "extension/icons/blue128.png",
  },
  permissions: ["notifications", "background", "webNavigation", "webRequest"],
  background: {
    service_worker: "extension/background/background.ts",
  },
  host_permissions: ["<all_urls>"],
});
