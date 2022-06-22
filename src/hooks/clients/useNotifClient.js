import PropTypes from 'prop-types';
import { NotificationApi } from "dcs-js";
import { AxiosInstance } from "axios";
import { getApiConfig } from "@helpers/api";

/**
 * Uses NotificationApi from dcs-js.
 */
export const useNotifClient = ({ token, basePath, notifClient, axios, configuration } = {}) => {
  if (notifClient instanceof NotificationApi) return notifClient;
  const _configuration = getApiConfig({ token, ...configuration, basePath });
  return new NotificationApi(_configuration, _configuration.basePath, axios);
};

useNotifClient.propTypes = {
  token: PropTypes.string,
  basePath: PropTypes.string,
  notifClient: PropTypes.instanceOf(NotificationApi),
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