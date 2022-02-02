import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {CanisterMetadata} from "@psychedelic/dab-js/dist/interfaces/dab_registry";

export interface DabSliceState {
  dabInfo: {
    [canisterId: string]: DabInfo
  };
}

export interface DabInfo {
  info?: CanisterMetadata,
  isLoading: boolean,
  exists?: boolean
}

const initialState: DabSliceState = {
  dabInfo: {},
};

interface CanisterMetadataPayload {
  canisterId: string,
  metadata: CanisterMetadata
}

export const dabInfoSlice = createSlice({
  name: "dabInfo",
  initialState,
  reducers: {
    fetchingDabInfo: (state: DabSliceState, action: PayloadAction<string>) => {
      state.dabInfo[action.payload] = {isLoading: true}
    },
    persistCanisterData: (state: DabSliceState, action: PayloadAction<CanisterMetadataPayload>) => {
      const {canisterId, metadata} = action.payload
      state.dabInfo[canisterId] = {isLoading: false, info: metadata, exists: true}
    },
    missingData: (state: DabSliceState, action: PayloadAction<string>) => {
      state.dabInfo[action.payload] = {exists: false, isLoading: false}
    }
  }
})

export const {fetchingDabInfo, persistCanisterData, missingData} = dabInfoSlice.actions;
export default dabInfoSlice.reducer;