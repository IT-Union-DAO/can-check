import React, {useCallback, useEffect} from 'react';
import "@components/App/App.css"
import {useAppDispatch, useAppSelector} from "@store/hooks/App";
import {Spinner} from "@components/Spinner/Spinner";
import {getCoverInfo} from "@store/actions/ActionCreators";
import browser from "webextension-polyfill";
import {ContentScriptMessages} from "@/extension/content/messages";

const Verification = () => {
  const canisterIds = useAppSelector(state => Object.keys(state.detectedCanisterReducer.detectedCanisters))
  const {dabInfo} = useAppSelector(state => state.dabInfoReducer)
  const {coverInfo} = useAppSelector(state => state.coverInfoReducer)
  const dispatch = useAppDispatch()

  const fetchCanisterData = useCallback(async () => {

    const isCoverVerified = id => coverInfo[id] !== undefined && coverInfo[id].isLoading === false

    const coverVerifiedIds: string[] = Object.keys(coverInfo)
    .filter(isCoverVerified)

    if (canisterIds.length === coverVerifiedIds.length) {
      await browser.runtime.sendMessage({type: ContentScriptMessages.CANISTERS_CHECK_COMPLETE})
      window.close()
    } else {
      canisterIds
      .forEach(canisterId => {
        if (coverInfo[canisterId] === undefined) {
          dispatch(getCoverInfo(canisterId))
        }
      })
    }
  }, [canisterIds, dabInfo, coverInfo])

  useEffect(() => {
    fetchCanisterData().catch(console.error)
  }, [fetchCanisterData])
  return (
      <div className="App">
        <h1 className="text-2xl">Fetching canister data</h1>
        <Spinner/>
      </div>
  )
}
export default Verification