import {useAppDispatch, useAppSelector} from "@/core/redux/hooks/App";
import {CoverInfo} from "@/core/redux/slices/CoverInfoSlice";
import {getCoverInfo} from "@store/actions/ActionCreators";
import {useCallback, useEffect, useState} from "react";
import Card from "../Card";
import logo from "./cover-logo.svg";
import DisplayedCoverData from "./DisplayedCoverData";

interface CoverCardProps {
  canisterId: string;
}

export default function CoverCard({canisterId}: CoverCardProps) {
  const coverData: CoverInfo | undefined = useAppSelector(
      (state) => state.coverInfoReducer.coverInfo[canisterId]
  );
  const [isFetching, setIsFetching] = useState(true);
  const dispatch = useAppDispatch();

  const shouldShowSpinner = () => {
    return coverData ? coverData.isLoading : false
  }

  const queryCover = useCallback(async () => {
    if (!coverData) {
      dispatch(getCoverInfo(canisterId));
    } else {
      setIsFetching(false);
    }
  }, [coverData]);

  useEffect(() => {
    queryCover().catch(console.error);
  }, [queryCover]);


  return (
      <Card logo={logo}>
        <DisplayedCoverData isLoading={shouldShowSpinner()} content={coverData?.info}/>
      </Card>
  );
}
