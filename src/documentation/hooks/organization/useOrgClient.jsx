import React from 'react';
import PropTypes from 'prop-types';
import { OrganizationApi } from 'dcs-js';
import { AxiosInstance } from "axios";
/**
 * Uses DCS Organization API.
 * @param {Object} config - Token needed to make secure requests.
 * @param {string} config.token - Token needed to make secure requests.
 * @param {string} config.basePath - basePath to make the request
 */
export function useOrgClient() {
  return <></>;
};

useOrgClient.propTypes = {
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