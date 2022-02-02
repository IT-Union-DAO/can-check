import {setUpReduxStore} from "@store/backgroundStore";
import {DetectedCanister, persistDetectedCanister} from "@store/slices/DetectedCanistersSlice";

describe("When using detected canisters storage", () => {

  let store = setUpReduxStore()

  test("Should start from empty set of detected canisters", () => {
    let state = store.getState().detectedCanisterReducer
    expect(state.detectedCanisters).toMatchObject({})
  })

  test("Should add canister to store only if it is absent", () => {
    //given
    const payloadOne: DetectedCanister = {canisterId: "canister_1", tabId: "1"}
    const payloadTwo: DetectedCanister = {canisterId: "canister_1", tabId: "1"}
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
    const payloadOne: DetectedCanister = {canisterId: "canister_1", tabId: "1"}
    const payloadTwo: DetectedCanister = {canisterId: "canister_1", tabId: "2"}
    const payloadThree: DetectedCanister = {canisterId: "canister_2", tabId: "1"}
    const payloadFour: DetectedCanister = {canisterId: "canister_2", tabId: "2"}
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
})

