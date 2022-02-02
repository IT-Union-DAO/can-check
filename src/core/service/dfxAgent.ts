import {Actor, Certificate, HttpAgent} from "@dfinity/agent";
import {Principal} from "@dfinity/principal";
import {CanisterMetadata} from "@psychedelic/dab-js/dist/interfaces/dab_registry";
import {getCanisterInfo} from "@psychedelic/dab-js";
import {CoverActor, Verification} from "@/core/models/Cover";
import {coverIdlFactory} from "@/core/service/idl/cover.did.js";
import {blobFromText, blobFromUint8Array} from "@dfinity/candid";

const coverCanisterPrincipal = "iftvq-niaaa-aaaai-qasga-cai";

const agent = new HttpAgent({host: "https://ic0.app"});

const coverActor = Actor.createActor<CoverActor>(coverIdlFactory, {
  canisterId: coverCanisterPrincipal,
  agent: agent,
});

export const queryCoverStatus = async (
    text: string
): Promise<undefined | Verification> => {
  const response = await coverActor.getVerificationByCanisterId(
      Principal.fromText(text)
  )
  if (response.length == 1) {
    return response[0]
  }
};

/**
 * This method would be left as is. But it could not be executed due to current manifest v3 restrictions
 * https://bugs.chromium.org/p/chromium/issues/detail?id=1173354
 * @param canisterId
 */
export const getCanisterModuleHash = async (canisterId: string) => {
  const canisterPrincipal: Principal = Principal.fromText(canisterId)
  const path = [
    blobFromText("canister"),
    blobFromUint8Array(canisterPrincipal.toUint8Array()),
    blobFromText("module_hash")
  ]
  const res = await agent.readState(canisterId, {paths: [path]})
  const cert = new Certificate(res, agent);
  await cert.verify();
  const module_hash = await cert.lookup(path)
  return module_hash.toString("hex")
}

export const getDABMetadata = async (
    canisterId: string
): Promise<CanisterMetadata | undefined> => {
  return await getCanisterInfo({canisterId, agent});
};
