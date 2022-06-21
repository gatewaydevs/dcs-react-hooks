import React from 'react';
import PropTypes from 'prop-types';
/**
 * Get All organizations from DCS.
 * @param {Object} params - .
 * @param {Object} params.orgClient - OrganizationApi intance.
 * @param {Object} params.axios - replace default axios instance.
 * @param {Object} params.configuration - OrganizationApi configuration parameters.
 * @param {string} params.configuration.token
 * @param {(string|Promise|Callback)} params.configuration.apiKey
 * @param {string} params.configuration.username
 * @param {string} params.configuration.password
 * @param {(string|Promise|Callback)} params.configuration.accessToken
 * @param {string} params.configuration.basePath
 * @param {Object} params.configuration.baseOptions
 */
export function useAllOrgs() {
  return <></>;
};

useAllOrgs.propTypes = {
  /** see https://swr.vercel.app/docs/options#options */
  options: PropTypes.object,
  /** *dcs-js* instance config */
  configuration: PropTypes.shape({
    token: PropTypes.string,
    apiKey: PropTypes.oneOfType([PropTypes.string, PropTypes.func, PropTypes.instanceOf(Promise)]),
    username: PropTypes.string,
    password: PropTypes.string,
    accessToken: PropTypes.oneOfType([PropTypes.string, PropTypes.func, PropTypes.instanceOf(Promise)]),
    basePath: PropTypes.string,
    baseOptions: PropTypes.object,
  })
};
