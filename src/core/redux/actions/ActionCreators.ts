import {AppDispatch} from "@/core/redux/backgroundStore";
import {CanisterMetadata} from "@psychedelic/dab-js/dist/interfaces/dab_registry";
import {fetchingDabInfo, missingData, persistCanisterData,} from "@store/slices/DabInfoSlice";
import {
  fetchingCoverInfo,
  missingCoverData,
  persistCoverData,
  VerificationInfo,
} from "@store/slices/CoverInfoSlice";
import {Verification} from "@/core/models/Cover";
import {getDABMetadata, queryCoverStatus} from "@/core/service/dfxAgent";

export const fetchDABInfo =
    (canisterId: string) => async (dispatch: AppDispatch) => {
      try {
        dispatch(fetchingDabInfo(canisterId));
        const response: CanisterMetadata | undefined = await getDABMetadata(
            canisterId
        );
        if (response) {
          dispatch(persistCanisterData({canisterId, metadata: response}));
        } else {
          dispatch(missingData(canisterId));
        }
      } catch (e) {
        console.error(e);
        dispatch(missingData(canisterId));
      }
    };

export const getCoverInfo =
    (canisterId: string) => async (dispatch: AppDispatch) => {
      try {
        dispatch(fetchingCoverInfo(canisterId));
        const metadata: Verification | undefined = await queryCoverStatus(
            canisterId
        );
        if (metadata) {
          const verificationInfo: VerificationInfo = coverResponseToVerificationPayload(metadata)
          dispatch(persistCoverData({canisterId, metadata: verificationInfo}));
        } else {
          dispatch(missingCoverData(canisterId));
        }
      } catch (e) {
        console.error(e);
        dispatch(missingData(canisterId));
      }
    };

function coverResponseToVerificationPayload(metadata: Verification): VerificationInfo {
  return {
    ...metadata,
    build_status: Object.keys(metadata.build_status).pop(),
    build_url: metadata.build_url[0],
    canister_id: metadata.canister_id.toText(),
    canister_type: Object.keys(metadata.canister_type).pop(),
    rust_version: metadata?.rust_version[0],
    updated_by: metadata.updated_by.toText(),
    wasm_hash: metadata?.wasm_hash[0]
  }
}
