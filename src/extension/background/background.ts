import {setUpReduxStore} from "@store/backgroundStore";
import {wrapStore} from "webext-redux";
import {BackgroundTasks} from "@/extension/background/BackgoundTasks";

const backgroundStore = setUpReduxStore();
wrapStore(backgroundStore);
new BackgroundTasks(backgroundStore).init()