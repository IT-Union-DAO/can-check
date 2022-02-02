import {setUpReduxStore} from "@store/backgroundStore";
import * as dfx from "@/core/service/dfxAgent"
import {getCoverInfo} from "@store/actions/ActionCreators";
import {VerificationInfo} from "@store/slices/CoverInfoSlice";

const queryCoverStatus = jest.spyOn(dfx, "queryCoverStatus")
let store
let dispatch
const coverTestCanisterId = "iftvq-niaaa-aaaai-qasga-cai"
describe.skip("When fetching Cover info", () => {

  beforeEach(() => {
    store = setUpReduxStore()
    dispatch = store.dispatch
  })

  test("Should switch on loading state for requested canister", () => {
    //when
    queryCoverStatus.mockImplementation((canisterId) => {
      const {coverInfo} = store.getState().coverInfoReducer

      expect(coverInfo[coverTestCanisterId].isLoading).toBeTruthy()
      return Promise.any([undefined])
    })
    dispatch(getCoverInfo(coverTestCanisterId))
  })

  test("Should persist canister info on known canister", completeTest => {

    dispatch(getCoverInfo(coverTestCanisterId))

    setInterval(() => {
      const {coverInfo} = store.getState().coverInfoReducer
      expect(coverInfo[coverTestCanisterId].isLoading).toBeFalsy()
      expect(coverInfo[coverTestCanisterId].exists).toBeTruthy()
      const verification: VerificationInfo = coverInfo[coverTestCanisterId].info
      expect(verification).toBeDefined()
      expect(verification.updated_at).toBeDefined()
      expect(verification.updated_by).toBeDefined()
      expect(verification.canister_id).toBeDefined()
      expect(verification.dfx_version).toBeDefined()
      expect(verification.build_status).toBeDefined()
      expect(verification.canister_name).toBeDefined()
      expect(verification.commit_hash).toBeDefined()
      expect(verification.canister_type).toBeDefined()
      expect(verification.repo_url).toBeDefined()
      expect(verification.rust_version).toBeDefined()
      expect(verification.optimize_count).toBeDefined()
      expect(verification.build_url).toBeDefined()
      expect(verification.wasm_hash).toBeDefined()
      completeTest()
    }, 2500)
  }, 10000)

  test("Should set false \"exist\" flag on missing Cover info", completeTest => {
    queryCoverStatus.mockResolvedValue(undefined)

    dispatch(getCoverInfo(coverTestCanisterId))

    setInterval(() => {
      const {coverInfo} = store.getState().coverInfoReducer
      expect(coverInfo[coverTestCanisterId].isLoading).toBeFalsy()
      expect(coverInfo[coverTestCanisterId].exists).toBeFalsy()
      expect(coverInfo[coverTestCanisterId].info).toBeUndefined()
      completeTest()
    }, 1500)
  }, 10000)

})