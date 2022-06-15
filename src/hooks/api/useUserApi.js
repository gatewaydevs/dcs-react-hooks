import { UserApi } from "dcs-js";
import { useApiConfig } from "./useApiConfig";

/**
 * Uses DCS User API.
 * @param {Object} config - Object containing information required for Basic authorization
 * @param {string} config.username - The username
 * @param {string} config.password - The user password
 * @param {string} config.password - The user password
 * 
 */
export const useUserApi = ({ username, password, basePath, ...config }) => {
  console.log({config})
  const _config = useApiConfig({ username, password, basePath, ...config })
  const userClient = new UserApi(_config);
  return userClient;
};
