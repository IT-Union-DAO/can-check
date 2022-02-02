import "mockzilla-webextension";
import {wrapStore} from "webext-redux";
import mock = jest.mock;

const fetch = require("node-fetch");

global.fetch = fetch
mock("@/core/redux/proxyStore.ts")
mock("webext-redux")
mock("@/core/env.ts")

export const mockedWrapStore = wrapStore as jest.MockedFunction<any>
