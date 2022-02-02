import {setUpReduxStore} from "@store/backgroundStore";
import * as dfx from "@/core/service/dfxAgent";
import {fetchDABInfo} from "@store/actions/ActionCreators";

const getDABMetadata: jest.SpiedFunction<any> = jest.spyOn(dfx, "getDABMetadata")


let store
let dispatch
const dscvrCanisterId = "h5aet-waaaa-aaaab-qaamq-cai"

describe("When fetching DAB info by action creator", () => {

  beforeEach(() => {
    store = setUpReduxStore()
    dispatch = store.dispatch
  })

  test("Should switch on loading state for requested canister", () => {
    //when
    getDABMetadata.mockImplementation((canisterId) => {
      // then Make sure state has loading status before call to DAB canister
      const {dabInfo} = store.getState().dabInfoReducer
      expect(dabInfo[dscvrCanisterId].isLoading).toBeTruthy()
      return Promise.any([undefined])
    })

    dispatch(fetchDABInfo(dscvrCanisterId))
  })

  test("Should persist canister info on known canister", completeTest => {

    const mockedResult = {
      url: 'https://dscvr.one/',
      name: 'DSCVR',
      description: 'A decentralized social news aggregator built on the Internet Computer.',
      version: 0,
      logo_url: 'https://h5aet-waaaa-aaaab-qaamq-cai.raw.ic0.app/favicon.ico'
    }
    getDABMetadata.mockResolvedValue(mockedResult)

    dispatch(fetchDABInfo(dscvrCanisterId))

    chrome://vivaldi-webui/startpage?section=Speed-dials&background-color=#2f2f2f
        setTimeout(() => {
          const {dabInfo} = store.getState().dabInfoReducer
          expect(dabInfo[dscvrCanisterId].isLoading).toBeFalsy()
          expect(dabInfo[dscvrCanisterId].exists).toBeTruthy()
          expect(dabInfo[dscvrCanisterId].info).toStrictEqual(mockedResult)
          completeTest()
        }, 3000)
  })

  test("Should set false \"exist\" flag on missing DAB info", completeTest => {
    const unknownCanisterId = "h2bch-3yaaa-aaaab-qaama-cai"
    getDABMetadata.mockResolvedValue(undefined)

    dispatch(fetchDABInfo(unknownCanisterId))


    setTimeout(() => {
      const {dabInfo} = store.getState().dabInfoReducer
      expect(dabInfo[unknownCanisterId].isLoading).toBeFalsy()
      expect(dabInfo[unknownCanisterId].exists).toBeFalsy()
      expect(dabInfo[unknownCanisterId].info).toBeUndefined()

      completeTest()
    }, 1500)
  })
})