import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {CanisterInfo} from "@/core/models/CanisterInfo";

interface RequestState {
  isLoading: boolean;
  error: string;
  count: number;
  canisters: Set<CanisterInfo>
}

const initialState: RequestState = {
  isLoading: false,
  error: '',
  count: 0,
  canisters: new Set<CanisterInfo>()
}

export const requestSlice = createSlice({
  name: 'request',
  initialState,
  reducers: {
    validatingUrl(state) {
      state.isLoading = true;
    },
    addCanisterInfo(state, action: PayloadAction<CanisterInfo>) {
      state.canisters.add(action.payload)
    },
    validationError(state, action : PayloadAction<string>) {
      state.isLoading = false
      state.error = action.payload
    },
    validatedCanisters(state) {
      state.isLoading = false
    }
  }
})

export default requestSlice.reducer;
