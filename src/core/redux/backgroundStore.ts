import {combineReducers, configureStore} from "@reduxjs/toolkit";
import detectedCanisterReducer from "./slices/CanistersForTabsSlice";
import dabInfoReducer from "./slices/DabInfoSlice";
import coverInfoReducer from "./slices/CoverInfoSlice";
import {getEnvType} from "@/core/env";

const rootReducer = combineReducers({
  detectedCanisterReducer,
  dabInfoReducer,
  coverInfoReducer
});

export const setUpReduxStore = () => {
  return configureStore({
    reducer: rootReducer,
    devTools: getEnvType() !== "production",
  });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setUpReduxStore>;
export type AppDispatch = AppStore["dispatch"];
