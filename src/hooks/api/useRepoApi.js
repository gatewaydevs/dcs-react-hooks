import { RepositoryApi } from "dcs-js";
import { useApiConfig } from "./useApiConfig";

/**
 * Uses DCS Repository API.
 * @param {string} token - Token needed to make secure requests.
 * @param {string} basePath - basePath to make the request
 */
export const useRepoApi = ({ token, basePath, ...config } = {}) => {
  const _config = useApiConfig({ token, basePath, ...config });
  const repoClient = new RepositoryApi(_config);
  return repoClient;
};
