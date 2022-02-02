import { BackgroundTasks } from "@/core/BackgoundTasks";
import { setUpReduxStore } from "@store/backgroundStore";
import { wrapStore } from "webext-redux";

const backgroundStore = setUpReduxStore();
wrapStore(backgroundStore);
new BackgroundTasks(backgroundStore).init();
