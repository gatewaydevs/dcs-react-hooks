import PropTypes from 'prop-types';
import { SettingsApi } from "dcs-js";
import { AxiosInstance } from "axios";
import { getApiConfig } from "@helpers/api";

/**
 * Uses SettingsApi from dcs-js.
 */
export const useSettingsClient = ({ token, basePath, settingsClient, axios, configuration } = {}) => {
  if (settingsClient instanceof SettingsApi) return settingsClient;
  const _configuration = getApiConfig({ token, ...configuration, basePath });
  return new SettingsApi(_configuration, _configuration.basePath, axios);
};

useSettingsClient.propTypes = {
  token: PropTypes.string,
  basePath: PropTypes.string,
  settingsClient: PropTypes.instanceOf(SettingsApi),
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