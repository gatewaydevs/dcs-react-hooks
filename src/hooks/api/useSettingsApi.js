import { SettingsApi } from "dcs-js";
import { useApiConfig } from "./useApiConfig";

/**
 * Uses DCS Settings API.
 * @param {string} token - Token needed to make secure requests.
 */
export const useSettingsApi = ({ token }) => {
  const config = useApiConfig({ token });
  const SettingsClient = new SettingsApi(config);
  return SettingsClient;
};
