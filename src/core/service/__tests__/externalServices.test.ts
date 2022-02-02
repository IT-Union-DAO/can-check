import {HttpAgent} from "@dfinity/agent";
import {getCanisterInfo} from "@psychedelic/dab-js";
import {queryCoverStatus} from "@/core/service/dfxAgent";
import {Verification} from "@/core/models/Cover";

const httpAgent = new HttpAgent({host: "https://ic0.app"})
const dscvrCanisterID = "h5aet-waaaa-aaaab-qaamq-cai"
const requestedPrincipal = "h2bch-3yaaa-aaaab-qaama-cai"


describe("When extension uses dfx Agent to call IC services", () => {

  test("It should send request to DAB and fetch metadata about canister (dsvr.one)",
      async () => {
        const canisterMetadata = await getCanisterInfo({
          canisterId: dscvrCanisterID,
          agent: httpAgent
        });

        expect(canisterMetadata).toStrictEqual({
          url: 'https://dscvr.one/',
          name: 'DSCVR',
          description: 'A decentralized social news aggregator built on the Internet Computer.',
          version: 0,
          logo_url: 'https://h5aet-waaaa-aaaab-qaamq-cai.raw.ic0.app/favicon.ico'
        })
      })

  test("It should return undefined on DAB query with unknown canister", async () => {
    const canisterMetadata = await getCanisterInfo({
      canisterId: requestedPrincipal,
      agent: httpAgent
    });
    expect(canisterMetadata).toBe(undefined)
  })

  test("Should receive some response when querying Cover actor", async () => {
    const canisterPrincipalFromCoverDocs = "iftvq-niaaa-aaaai-qasga-cai"
    const response: Verification | undefined = await queryCoverStatus(canisterPrincipalFromCoverDocs)
    expect(response).toBeDefined()
    expect(response.build_status).toEqual({"Success": null})
    expect(response.canister_name).toEqual("cover")
    expect(response.repo_url).toEqual("psychedelic/cover")
  })

})