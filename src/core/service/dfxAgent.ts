import {Actor, HttpAgent} from "@dfinity/agent";
import {Principal} from "@dfinity/principal";
import {CanisterMetadata} from "@psychedelic/dab-js/dist/interfaces/dab_registry";
import {getCanisterInfo} from "@psychedelic/dab-js";
import {CoverActor, Verification} from "@/core/models/Cover";
import {idlFactory} from "@/core/service/cover.did.js";

const coverCanisterPrincipal = "iftvq-niaaa-aaaai-qasga-cai";

const agent = new HttpAgent({host: "https://ic0.app"});

const coverActor = Actor.createActor<CoverActor>(idlFactory, {
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

export const getDABMetadata = async (
    canisterId: string
): Promise<CanisterMetadata | undefined> => {
  return await getCanisterInfo({canisterId, agent});
};
