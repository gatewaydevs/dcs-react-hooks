import { AdminApi } from "dcs-js";
import { useApiConfig } from "./useApiConfig";

/**
 * Uses DCS admin API.
 * @param {string} token - Token needed to make secure requests.
 */
export const useAdminApi = ({ token }) => {
  const config = useApiConfig({ token });
  const AdminClient = new AdminApi(config);
  return AdminClient;
};