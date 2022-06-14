import { OrganizationApi } from "dcs-js";
import { useApiConfig } from "./useApiConfig";

/**
 * Uses DCS organization API.
 * @param {string} token - Token needed to make secure requests.
 */
export const useOrgApi = ({ token }) => {
  const config = useApiConfig({ token });
  const orgClient = new OrganizationApi(config);
  return orgClient;
};
