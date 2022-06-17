import { OrganizationApi } from "dcs-js";
import { AxiosInstance } from "axios";
import PropTypes from 'prop-types';
import { getApiConfig } from "../../helpers/api";

/**
 * Uses DCS organization API.
 * @param {Object} params - useOrgApi parameters.
 * @param {string} params.token - Token needed to make secure requests.
 * @param {string} params.basePath - base route where the request will be sent.
 * @param {Object} params.organizationClient - OrganizationApi intance.
 * @param {Object} axios - replace default axios instance.
 * @param {Object} configuration - OrganizationApi configuration parameters.
 * @param {(string|Promise|Callback)} configuration.apiKey
 * @param {string} configuration.username
 * @param {string} configuration.password
 * @param {(string|Promise|Callback)} configuration.accessToken
 * @param {string} configuration.basePath
 * @param {string} configuration.baseOptions
 */
export const useOrgApi = ({ token, basePath, organizationClient, axios, configuration }) => {
  if (organizationClient instanceof OrganizationApi) return organizationClient;
  const _configuration = getApiConfig({ token, ...configuration, basePath });
  return new OrganizationApi(_configuration, _configuration.basePath, axios);
};

useOrgApi.propTypes = {
  token: PropTypes.string,
  basePath: PropTypes.string,
  organizationClient: PropTypes.instanceOf(OrganizationApi),
  axios: PropTypes.instanceOf(AxiosInstance),
  /** *dcs-js* instance config */
  configuration: PropTypes.shape({
    apiKey: PropTypes.oneOfType([PropTypes.string, PropTypes.func, PropTypes.instanceOf(Promise)]),
    username: PropTypes.string,
    password: PropTypes.string,
    accessToken: PropTypes.oneOfType([PropTypes.string, PropTypes.func, PropTypes.instanceOf(Promise)]),
    basePath: PropTypes.string,
    baseOptions: PropTypes.object,
  })
};