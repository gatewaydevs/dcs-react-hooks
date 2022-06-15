import { OrganizationApi } from "dcs-js";
import { getApiConfig } from "../../helpers/api";

/**
 * Uses DCS organization API.
 * @param {string} token - Token needed to make secure requests.
 * @param {string} basePath - basePath to make the request
 */
export const useOrgApi = ({ token, basePath, organizationClient, axios, configuration } = {}) => {
  if (organizationClient instanceof OrganizationApi) return organizationClient;
  const _configuration = getApiConfig({ token, ...configuration, basePath });
  return new OrganizationApi(_configuration, _configuration.basePath, axios);
};
