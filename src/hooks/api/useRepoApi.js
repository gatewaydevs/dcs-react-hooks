import { RepositoryApi } from "dcs-js";
import { getApiConfig } from "../../helpers/api";

/**
 * Uses DCS Repository API.
 * @param {string} token - Token needed to make secure requests.
 * @param {string} basePath - basePath to make the request
 */
export const useRepoApi = ({ token, basePath, repositoryClient, axios, configuration } = {}) => {
  if (repositoryClient instanceof RepositoryApi) return repositoryClient;
  const _configuration = getApiConfig({ token, ...configuration, basePath });
  return new RepositoryApi(_configuration, _configuration.basePath, axios);;
};
