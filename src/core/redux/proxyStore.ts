import {applyMiddleware, Store} from "webext-redux";
import thunk, {ThunkMiddleware} from "redux-thunk";

/**
 * Proxy redux store is used to connect web extension components to Redux Store
 * in extension's background script
 */
const store: Store = new Store()
const middleware: [ThunkMiddleware] = [thunk]
export const proxyStoreWithMiddleWare: Store = applyMiddleware(store, ...middleware)