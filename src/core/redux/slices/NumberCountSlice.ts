import {createSlice, PayloadAction} from "@reduxjs/toolkit";


interface NumberCountInitialState {
  count: number
}

const initialState: NumberCountInitialState = {
  count: 0
}

export const numberCountSlice = createSlice({
  name: 'numberCount',
  initialState,
  reducers: {
    increment: (state, action: PayloadAction<number>) => {
      state.count += action.payload
    }
  }
})

export default numberCountSlice.reducer