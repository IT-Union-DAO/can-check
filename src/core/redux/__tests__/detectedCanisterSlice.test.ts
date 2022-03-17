import {setUpReduxStore} from "@store/backgroundStore";
import {DetectedCanister, persistDetectedCanister} from "@store/slices/CanistersForTabsSlice";

describe("When using detected canisters storage", () => {

  let store

  beforeEach(() => {
    store = setUpReduxStore()
  })

  test("Should start from empty set of detected canisters", () => {
    let state = store.getState().detectedCanisterReducer
    expect(state.detectedCanisters).toMatchObject({})
  })

  test("Should add canister to store only if it is absent", () => {
    //given
    const payloadOne: DetectedCanister = {canisterId: "canister_1", tabId: "1", url: "url1"}
    const payloadTwo: DetectedCanister = {canisterId: "canister_1", tabId: "1", url: "url1"}
    //when
    store.dispatch(persistDetectedCanister(payloadOne))
    store.dispatch(persistDetectedCanister(payloadTwo))
    //then
    expect(store.getState().detectedCanisterReducer.detectedCanisters).toMatchObject({
      "canister_1": ["1"]
    })
  })

  test("Should add new tabId to detected canister", () => {
    //given
    const payloadOne: DetectedCanister = {canisterId: "canister_1", tabId: "1", url: "url1"}
    const payloadTwo: DetectedCanister = {canisterId: "canister_1", tabId: "2", url: "url1"}
    const payloadThree: DetectedCanister = {canisterId: "canister_2", tabId: "1", url: "url1"}
    const payloadFour: DetectedCanister = {canisterId: "canister_2", tabId: "2", url: "url1"}
    //when
    store.dispatch(persistDetectedCanister(payloadOne))
    store.dispatch(persistDetectedCanister(payloadTwo))
    store.dispatch(persistDetectedCanister(payloadThree))
    store.dispatch(persistDetectedCanister(payloadFour))
    //then
    const {detectedCanisters} = store.getState().detectedCanisterReducer
    expect(detectedCanisters).toMatchObject({
      "canister_1": ["1", "2"],
      "canister_2": ["1", "2"]
    })
  })

  test("Should add new url in case it was already added. Canisters for url should be original", () => {
    //given
    const payloadOne: DetectedCanister = {canisterId: "canister_1", tabId: "1", url: "url1"}
    const payloadTwo: DetectedCanister = {canisterId: "canister_1", tabId: "2", url: "url1"}
    const payloadThree: DetectedCanister = {canisterId: "canister_2", tabId: "1", url: "url2"}
    const payloadFour: DetectedCanister = {canisterId: "canister_2", tabId: "2", url: "url2"}

    const payloadFive: DetectedCanister = {canisterId: "canister_3", tabId: "1", url: "url1"}
    const payloadSix: DetectedCanister = {canisterId: "canister_3", tabId: "2", url: "url2"}

    //when
    store.dispatch(persistDetectedCanister(payloadOne))
    store.dispatch(persistDetectedCanister(payloadTwo))
    store.dispatch(persistDetectedCanister(payloadThree))
    store.dispatch(persistDetectedCanister(payloadFour))
    store.dispatch(persistDetectedCanister(payloadFive))
    store.dispatch(persistDetectedCanister(payloadSix))
    //then
    const {detectedCanisters} = store.getState().detectedCanisterReducer
    const {urlsVsCanisters} = store.getState().detectedCanisterReducer
    expect(detectedCanisters).toMatchObject({
      "canister_1": ["1", "2"],
      "canister_2": ["1", "2"],
      "canister_3": ["1", "2"],
    })
    expect(urlsVsCanisters).toMatchObject({
      "url1": ["canister_1", "canister_3"],
      "url2": ["canister_2", "canister_3"]
    })
  })
})

