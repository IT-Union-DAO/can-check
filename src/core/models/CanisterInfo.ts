import {CanisterMetadata} from "@psychedelic/dab-js/dist/interfaces/dab_registry";
import {Verification} from "@/core/models/Cover";

export interface CanisterInfo {
  canisterId : string
  dabMetadata : CanisterMetadata | null
  coverData: Verification | null
}