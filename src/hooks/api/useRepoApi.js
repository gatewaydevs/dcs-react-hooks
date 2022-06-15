import PropTypes from 'prop-types';
import { RepositoryApi } from 'dcs-js';
import { AxiosInstance } from "axios";
import { getApiConfig } from "../../helpers/api";

/**
 * Uses DCS repository API.
 * @param {Object} params - useOrgApi parameters.
 * @param {string} params.token - Token needed to make secure requests.
 * @param {string} params.basePath - base route where the request will be sent.
 * @param {Object} params.repositoryClient - repositoryApi intance.
 * @param {Object} axios - replace default axios instance.
 * @param {Object} configuration - repositoryApi configuration parameters.
 * @param {(string|Promise|Callback)} configuration.apiKey
 * @param {string} configuration.username
 * @param {string} configuration.password
 * @param {(string|Promise|Callback)} configuration.accessToken
 * @param {string} configuration.basePath
 * @param {string} configuration.baseOptions
 */
export const useRepoApi = ({ token, basePath, repositoryClient, axios, configuration } = {}) => {
  if (repositoryClient instanceof RepositoryApi) return repositoryClient;
  const _configuration = getApiConfig({ token, ...configuration, basePath });
  return new RepositoryApi(_configuration, _configuration.basePath, axios);;
};

useRepoApi.propTypes = {
  token: PropTypes.string,
  basePath: PropTypes.string,
  repositoryClient: PropTypes.instanceOf(RepositoryApi),
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