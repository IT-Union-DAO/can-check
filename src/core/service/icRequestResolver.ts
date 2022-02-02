import {WebRequest} from "webextension-polyfill/namespaces/webRequest";

const canisterRequestRegex = RegExp("(/api/v2/canister/)\\S{27}/(query|call|metrics)");
const canisterPrincipalPattern = RegExp("(.{5}-){4}.{3}");

/**
 * Returns set of canister ids if any were spotted in HTTP headers
 * @param details
 */
export const extractCanisterIdsFromSendHeaderDetails = (
    details: WebRequest.OnSendHeadersDetailsType
): Set<string> => {
  let resultSet = new Set<string>();
  const isCanisterCall = canisterRequestRegex.test(details?.url);
  if (isCanisterCall) {
    const urlPrincipal = extractCanisterIdFromEndpoint(details?.url);
    urlPrincipal && resultSet.add(urlPrincipal);
    if (details?.initiator) {
      const initiatorPrincipal = extractCanisterIdFromEndpoint(
          details?.initiator
      );
      initiatorPrincipal && resultSet.add(initiatorPrincipal);
    }
  }
  return resultSet;
};

export const extractCanisterIdFromEndpoint = (
    url: string
): string | undefined => {
  const matchArray = canisterPrincipalPattern.exec(url);
  if (matchArray) {
    return matchArray[0];
  }
};