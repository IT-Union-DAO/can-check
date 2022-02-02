import {combineReducers, configureStore} from "@reduxjs/toolkit";
import detectedCanisterReducer from "./slices/CanistersForTabsSlice";
import dabInfoReducer from "./slices/DabInfoSlice";
import coverInfoReducer from "./slices/CoverInfoSlice";

const rootReducer = combineReducers({
  detectedCanisterReducer,
  dabInfoReducer,
  coverInfoReducer
});

export const setUpReduxStore = () => {
  return configureStore({
    reducer: rootReducer,
    devTools: process.env.NODE_ENV !== "production",
  });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setUpReduxStore>;
export type AppDispatch = AppStore["dispatch"];
