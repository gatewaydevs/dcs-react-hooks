import React from 'react';
import PropTypes from 'prop-types';
import { IssueApi } from 'dcs-js';
import { AxiosInstance } from "axios";

/**
 * Uses IssueApi from dcs-js.
 */
export function useIssueApi() {
  return <></>;
};

useIssueApi.propTypes = {
  token: PropTypes.string,
  basePath: PropTypes.string,
  issueClient: PropTypes.instanceOf(IssueApi),
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