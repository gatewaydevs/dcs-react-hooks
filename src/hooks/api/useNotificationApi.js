import { NotificationApi } from "dcs-js";
import { useApiConfig } from "./useApiConfig";

/**
 * Uses DCS Notification API.
 * @param {string} token - Token needed to make secure requests.
 */
export const useNotificationApi = ({ token }) => {
  const config = useApiConfig({ token });
  const NotificationClient = new NotificationApi(config);
  return NotificationClient;
};
