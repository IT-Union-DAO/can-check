import {WebRequest} from "webextension-polyfill/namespaces/webRequest";
import {extractCanisterIdsFromSendHeaderDetails} from "@/core/service/icRequestResolver";


describe("Background network interception", () => {

  test("Should extract canister principal ids", () => {
    //given
    const canisterQuery = "/api/v2/canister/h2bch-3yaaa-aaaab-qaama-cai/query"
    const canisterCall = "/api/v2/canister/h2bch-3yaaa-aaaab-qaama-cai/call"
    const noCanisterInPath = "/api/v2/canister/someincorrectstuff/call"
    const canisterInitiator = "https://h5aet-waaaa-aaaab-qaamq-cai.raw.ic0.app/"

    const detailsWithUrlAndInitiator: WebRequest.OnSendHeadersDetailsType = {
      frameId: 0,
      method: "",
      parentFrameId: 0,
      requestId: "",
      tabId: 0,
      thirdParty: false,
      timeStamp: 0,
      type: undefined,
      url: canisterCall,
      initiator: canisterInitiator
    }

    const detailsWithUrl: WebRequest.OnSendHeadersDetailsType = {
      frameId: 0,
      method: "",
      parentFrameId: 0,
      requestId: "",
      tabId: 0,
      thirdParty: false,
      timeStamp: 0,
      type: undefined,
      url: canisterQuery
    }

    const noCanister: WebRequest.OnSendHeadersDetailsType = {
      frameId: 0,
      method: "",
      parentFrameId: 0,
      requestId: "",
      tabId: 0,
      thirdParty: false,
      timeStamp: 0,
      type: undefined,
      url: noCanisterInPath
    }

    //when
    const urlsInitiator = extractCanisterIdsFromSendHeaderDetails(detailsWithUrlAndInitiator)
    const onlyUrl = extractCanisterIdsFromSendHeaderDetails(detailsWithUrl)
    const empty = extractCanisterIdsFromSendHeaderDetails(noCanister)

    //then
    expect(urlsInitiator.size).toBe(2)
    expect(onlyUrl.size).toBe(1)
    expect(empty.size).toBe(0)

    new Set(["h2bch-3yaaa-aaaab-qaama-cai", "h5aet-waaaa-aaaab-qaamq-cai"])
    .forEach(id => {
      expect(urlsInitiator.has(id)).toBeTruthy()
    })

    expect(onlyUrl.has("h2bch-3yaaa-aaaab-qaama-cai")).toBeTruthy()
  })
})

