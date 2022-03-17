import {useCallback, useEffect, useState} from "react";
import {useAppSelector} from "@store/hooks/App";
import {cleanUrl, getCurrentActiveBrowserTab} from "@/core/service/utils";
import Accordion from "@components/Accordion/Accordion";

const CanisterStats = () => {
  const {urlsVsCanisters} = useAppSelector(
      (state) => state.detectedCanisterReducer
  );
  const [canisters, setCanisters] = useState<string[] | undefined>([]);
  const [currentUrl, setCurrentUrl] = useState<string>("");

  const renderHeader = () => {
    if (!canisters || canisters.length == 0) {
      return (
          <>
            <h1 className="text-3xl text-amber-400">
              Open extension on IC DApp's web pages
            </h1>
            <h2 className="text-xs text-amber-300 p-2">
              Refresh the page if data is missing
            </h2>
          </>
      );
    } else {
      return (
          <span className="text-xl text-amber-400">
          <h1>Canisters found on url:</h1>
          <h2>{currentUrl}</h2>
        </span>
      );
    }
  };

  const renderCanisters = () => {
    if (canisters) {
      return canisters.map((value) => {
        return <Accordion key={value} title={value}/>;
      })
    }
  }

  const getCanistersForTab = useCallback(async () => {
    try {
      const currentTab = await getCurrentActiveBrowserTab();
      const tabUrl = cleanUrl(currentTab.url)
      const ids: string[] | undefined = urlsVsCanisters[tabUrl]
      setCanisters(ids);
      setCurrentUrl(tabUrl);
    } catch (error) {
      console.error(error);
    }
  }, [urlsVsCanisters]);

  useEffect(() => {
    getCanistersForTab().catch(console.error);
  }, [getCanistersForTab]);

  return (
      <div className="max-w-md p-3">
        {renderHeader()}
        {renderCanisters()}
      </div>
  );
};
export default CanisterStats;
