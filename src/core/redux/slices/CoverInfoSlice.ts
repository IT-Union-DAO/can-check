import {createSlice, PayloadAction} from "@reduxjs/toolkit";

export interface CoverInfoSliceState {
  coverInfo: {
    [canisterId: string]: CoverInfo
  }
}

export interface VerificationInfo {
  updated_at: string;
  updated_by: string;
  canister_id: string;
  dfx_version: string;
  build_status: string
  canister_name: string;
  commit_hash: string;
  canister_type?: string
  repo_url: string;
  rust_version?: string;
  optimize_count: number;
  build_url?: string;
  wasm_hash?: string;
}

export interface CoverInfo {
  info?: VerificationInfo,
  isLoading: boolean,
  exists?: boolean
}

const initialState: CoverInfoSliceState = {
  coverInfo: {}
}

interface CoverMetadataPayload {
  canisterId: string,
  metadata: VerificationInfo
}

export const coverInfoSlice = createSlice({
  name: "coverInfo",
  initialState,
  reducers: {
    fetchingCoverInfo: (state: CoverInfoSliceState, action: PayloadAction<string>) => {
      state.coverInfo[action.payload] = {isLoading: true}
    },
    persistCoverData: (state: CoverInfoSliceState, action: PayloadAction<CoverMetadataPayload>) => {
      const {canisterId, metadata} = action.payload
      state.coverInfo[canisterId] = {isLoading: false, info: metadata, exists: true}
    },
    missingCoverData: (state: CoverInfoSliceState, action: PayloadAction<string>) => {
      state.coverInfo[action.payload] = {exists: false, isLoading: false}
    }
  }
})

export const {fetchingCoverInfo, persistCoverData, missingCoverData} = coverInfoSlice.actions
export default coverInfoSlice.reducer