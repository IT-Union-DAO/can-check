import {createSlice, PayloadAction} from "@reduxjs/toolkit";


export interface DetectedCanistersState {
  detectedCanisters: { [canisterId: string]: string[] };
  urlsVsCanisters: { [url: string]: string[] }
  tabToVerify: { tabId: string, isEnabled: boolean, url: string }
}

const initialState: DetectedCanistersState = {
  detectedCanisters: {},
  urlsVsCanisters: {},
  tabToVerify: {tabId: undefined, isEnabled: false, url: undefined}
};

export interface DetectedCanister {
  canisterId: string;
  tabId: string;
  url: string
}

const saveCanister = (
    state: DetectedCanistersState,
    action: PayloadAction<DetectedCanister>
) => {
  let tabIds: string[] | undefined =
      state.detectedCanisters[action.payload.canisterId];
  const canistersForUrl: string[] | undefined = state.urlsVsCanisters[action.payload.url];
  if (tabIds?.length > 0) {
    const isTabIdAlreadyPresent = !!tabIds.find(
        (value) => action.payload.tabId == value
    );
    if (!isTabIdAlreadyPresent) {
      state.detectedCanisters[action.payload.canisterId] = [
        ...tabIds,
        action.payload.tabId,
      ];
    }
  } else {
    state.detectedCanisters[action.payload.canisterId] = [action.payload.tabId];
  }
  if (canistersForUrl?.length > 0) {
    const isCanisterPresentForUrl = !!canistersForUrl.find(
        canisterId => action.payload.canisterId == canisterId
    )
    if (!isCanisterPresentForUrl) {
      state.urlsVsCanisters[action.payload.url] = [...canistersForUrl, action.payload.canisterId]
    }
  } else {
    state.urlsVsCanisters[action.payload.url] = [action.payload.canisterId]
  }
};

interface tabToVerifyPayload {
  tabId: string,
  url: string
}

export const canistersForTabsSlice = createSlice({
  name: "detectedCanisters",
  initialState,
  reducers: {
    persistDetectedCanister: saveCanister,
    enableTabToVerify: (state, action: PayloadAction<tabToVerifyPayload>) => {
      state.tabToVerify = {
        tabId: action.payload.tabId,
        url: action.payload.url,
        isEnabled: true
      }
    },
    disableTabToVerify: (state) => {
      state.tabToVerify = {...state.tabToVerify, isEnabled: false}
    }
  },
});

export const {
  persistDetectedCanister,
  enableTabToVerify,
  disableTabToVerify
} = canistersForTabsSlice.actions;

export default canistersForTabsSlice.reducer;
