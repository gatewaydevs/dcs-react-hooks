import { IssueApi } from "dcs-js";
import { useApiConfig } from "./useApiConfig";

/**
 * Uses DCS issue API.
 * @param {string} token - Token needed to make secure requests.
 */
export const useIssuesApi = ({ token }) => {
  const config = useApiConfig({ token });
  const issueClient = new IssueApi(config);
  return issueClient;
};
