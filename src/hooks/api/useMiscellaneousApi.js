import { MiscellaneousApi } from "dcs-js";
import { useApiConfig } from "./useApiConfig";

/**
 * Uses DCS Miscellaneous API.
 * @param {string} token - Token needed to make secure requests.
 */
export const useMiscellaneousApi = ({ token }) => {
  const config = useApiConfig({ token });
  const MiscellaneousClient = new MiscellaneousApi(config);
  return MiscellaneousClient;
};