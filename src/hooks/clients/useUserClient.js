import PropTypes from 'prop-types';
import { UserApi } from 'dcs-js';
import { AxiosInstance } from "axios";
import { getApiConfig } from "@helpers/api";
/**
 * Uses DCS User API.
 * @param {Object} config - Object containing information required for Basic authorization
 * 
 */
export const useUserClient = ({ token, userClient, basePath, axios, ...configuration }) => {
  if (userClient instanceof UserApi) return userClient;
  const _configuration = getApiConfig({ token, ...configuration, basePath });
  return new UserApi(_configuration, _configuration.basePath, axios);;
};

useUserClient.propTypes = {
  token: PropTypes.string,
  basePath: PropTypes.string,
  userClient: PropTypes.instanceOf(UserApi),
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