import PropTypes from 'prop-types';
import { IssueApi } from "dcs-js";
import { AxiosInstance } from "axios";
import { getApiConfig } from "@helpers/api";

/**
 * Uses IssueApi from dcs-js.
 */
export const useIssueClient = ({ token, basePath, issueClient, axios, configuration } = {}) => {
  if (issueClient instanceof IssueApi) return issueClient;
  const _configuration = getApiConfig({ token, ...configuration, basePath });
  return new IssueApi(_configuration, _configuration.basePath, axios);
};

useIssueClient.propTypes = {
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