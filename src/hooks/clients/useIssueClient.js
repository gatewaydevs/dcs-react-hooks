import { IssueApi } from "dcs-js";
import { getApiConfig } from "@helpers/api";

/**
 * Uses DCS issue API.
 * @param {string} token - Token needed to make secure requests.
 */
export const useIssuesClient = ({ token }) => {
  const config = getApiConfig({ token });
  const issueClient = new IssueApi(config);
  return issueClient;
};
