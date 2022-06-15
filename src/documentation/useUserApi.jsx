import React from 'react';
import PropTypes from 'prop-types';
import { UserApi } from 'dcs-js';
import { AxiosInstance } from "axios";
/**
 * Uses DCS User API.
 * @param {Object} config - Object containing information required for Basic authorization
 * @param {string} config.username - The username
 * @param {string} config.password - The user password
 */
export function useUserApi() {
  return <></>;
};

useUserApi.propTypes = {
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