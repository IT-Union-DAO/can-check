import {createSlice, PayloadAction} from "@reduxjs/toolkit";

export interface DetectedCanistersState {
  detectedCanisters: { [canisterId: string]: string[] };
}

const initialState: DetectedCanistersState = {
  detectedCanisters: {},
};

export interface DetectedCanister {
  canisterId: string;
  tabId: string;
}

const saveCanister = (
    state: DetectedCanistersState,
    action: PayloadAction<DetectedCanister>
) => {
  let tabIds: string[] | undefined =
      state.detectedCanisters[action.payload.canisterId];
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
};

export const detectedCanistersSlice = createSlice({
  name: "detectedCanisters",
  initialState,
  reducers: {
    persistDetectedCanister: saveCanister,
  },
});

export const {persistDetectedCanister} = detectedCanistersSlice.actions;

export default detectedCanistersSlice.reducer;
