import {useCallback, useEffect, useState} from "react";
import {useAppSelector} from "@store/hooks/App";
import {getCurrentActiveBrowserTab} from "@/core/service/utils";
import Accordion from "@components/Accordion/Accordion";

const CanisterStats = () => {
  const {detectedCanisters} = useAppSelector(
      (state) => state.detectedCanisterReducer
  );
  const [canisters, setCanisters] = useState<string[]>([]);
  const [currentUrl, setCurrentUrl] = useState<string>("");

  const renderHeader = () => {
    if (canisters.length == 0) {
      return (
          <h1 className="text-3xl text-amber-400">
            Open IC application to verify canisters
          </h1>
      );
    } else {
      return (
          <span className="text-xl text-amber-400">
          <h1>Canisters found for url</h1>
          <h2>{currentUrl}</h2>
        </span>
      );
    }
  };

  const getCanistersForTab = useCallback(async () => {
    try {
      const currentTab = await getCurrentActiveBrowserTab();
      const ids: string[] = Object.keys(detectedCanisters).filter(
          (canisterId) =>
              detectedCanisters[canisterId].includes(currentTab.id.toString())
      );
      setCanisters(ids);
      setCurrentUrl(currentTab.url);
    } catch (error) {
      console.error(error);
    }
  }, [detectedCanisters]);

  useEffect(() => {
    getCanistersForTab().catch(console.error);
  }, [getCanistersForTab]);

  return (
      <div className="max-w-md p-3">
        {renderHeader()}
        {canisters.map((value) => {
          return <Accordion key={value} title={value}/>;
        })}
      </div>
  );
};
export default CanisterStats;
