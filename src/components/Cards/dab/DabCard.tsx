import {useAppDispatch, useAppSelector} from "@/core/redux/hooks/App";
import {useCallback, useEffect, useState} from "react";
import Card from "../Card";
import {DisplayedDabData} from "./DisplayedDabData";
import logo from "./dab-logo.svg";
import {DabInfo} from "@store/slices/DabInfoSlice";
import {fetchDABInfo} from "@store/actions/ActionCreators";

interface DabCardProps {
  canisterId: string;
}

export default function DabCard({canisterId}: DabCardProps) {
  const dabData: DabInfo | undefined = useAppSelector(
      (state) => state.dabInfoReducer.dabInfo[canisterId]
  );
  const [isFetching, setIsFetching] = useState(true);
  const dispatch = useAppDispatch();
  const shouldShowSpinner = () => {
    return dabData ? dabData.isLoading : false
  }
  const getDabData = useCallback(async () => {
    if (!dabData) {
      dispatch(fetchDABInfo(canisterId));
    } else {
      setIsFetching(false);
    }
  }, [dabData]);

  useEffect(() => {
    getDabData().catch(console.error);
  }, [getDabData]);

  return (
      <Card logo={logo}>
        <DisplayedDabData
            isLoading={shouldShowSpinner()}
            content={dabData && dabData.info}
        />
      </Card>
  );
}
