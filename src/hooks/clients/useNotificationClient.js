import { NotificationApi } from "dcs-js";
import { getApiConfig } from "@helpers/api";

/**
 * Uses DCS Notification API.
 * @param {string} token - Token needed to make secure requests.
 */
export const useNotificationClient = ({ token }) => {
  const config = getApiConfig({ token });
  const NotificationClient = new NotificationApi(config);
  return NotificationClient;
};
