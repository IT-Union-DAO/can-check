import {combineReducers, configureStore} from "@reduxjs/toolkit";
import countReducer from "./slices/NumberCountSlice";
import detectedCanisterReducer from "./slices/DetectedCanistersSlice";
import dabInfoReducer from "./slices/DabInfoSlice";
import coverInfoReducer from "./slices/CoverInfoSlice";
import {getEnvType} from "@/core/env";

const rootReducer = combineReducers({
  countReducer,
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
