import { Spinner } from "@/components/Spinner/Spinner";
import React from "react";
import NoData from "../NoData";
import { VerificationInfo } from "@store/slices/CoverInfoSlice";

interface DisplayedCoverData {
  isLoading: boolean;
  content?: VerificationInfo;
}

export default function DisplayedCoverData({
  isLoading,
  content,
}: DisplayedCoverData) {
  const renderVerification = () => {
    return (
      <div className="text-gray-900 grid-cols-2 space-x-0 text-sm max-w-xs p-2">
        <div>
          <b>UPDATED AT</b>
          <p>{content.updated_at}</p>
        </div>
        <div>
          <b>UPDATED BY</b>
          <p>{content.updated_by}</p>
        </div>
        <div>
          <b>CANISTER ID</b>
          <p>{content.canister_id}</p>
        </div>
        <div>
          <b>DFX VERSION</b>
          <p>{content.dfx_version}</p>
        </div>
        <div>
          <b>BUILD STATUS</b>
          <p>{content.build_status}</p>
        </div>
        <div>
          <b>CANISTER NAME</b>
          <p>{content.canister_name}</p>
        </div>
        <div>
          <b>COMMIT HASH</b>
          <p>{content.commit_hash}</p>
        </div>
        <div>
          <b>CANISTER TYPE</b>
          <p>{content.canister_type}</p>
        </div>
        <div>
          <b>REPO URL</b>
          <p>{content.repo_url}</p>
        </div>
        <div>
          <b>RUST VERSION</b>
          <p>{content.rust_version}</p>
        </div>
        <div>
          <b>OPTIMIZE COUNT</b>
          <p>{content.optimize_count}</p>
        </div>
        <div>
          <b>BUILD URL</b>
          <p className="break-words">{content.build_url}</p>
        </div>
        <div>
          <b>WASM HASH</b>
          <p className="break-words">{content.wasm_hash}</p>
        </div>
      </div>
    );
  };

  if (isLoading) {
    return <Spinner />;
  } else {
    if (content === undefined) {
      return <NoData />;
    } else {
      return renderVerification();
    }
  }
}
