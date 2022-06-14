import useApiConfig from "./useApiConfig";

/**
 * Uses DCS issues API.
 * @param {string} token - Token needed to make secure requests.
 */
export const useDcsApi = ({ token, Class }) => {
  const config = useApiConfig({ token });
  const client = Class ? new Class(config) : null;
  return client;
};
