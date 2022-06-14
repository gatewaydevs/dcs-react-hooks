import { OrganizationApi } from "dcs-js";
import { useApiConfig } from "./useApiConfig";

/**
 * Uses DCS organization API.
 * @param {string} token - Token needed to make secure requests.
 * @param {string} basePath - basePath to make the request
 */
export const useOrgApi = ({ token, basePath, ...config }) => {
  const _config = useApiConfig({ token, basePath, ...config });
  const orgClient = new OrganizationApi(_config);
  return orgClient;
};
