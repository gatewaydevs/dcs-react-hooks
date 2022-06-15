import React from 'react';
import PropTypes from 'prop-types';
import { RepositoryApi } from 'dcs-js';
import { AxiosInstance } from "axios";

/**
 * Uses DCS Repository API.
 * @param {Object} config - Token needed to make secure requests.
 * @param {string} config.token - Token needed to make secure requests.
 * @param {string} config.basePath - basePath to make the request
 */
export function useRepoApi() {
  return <></>;
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