export const useApiConfig = ({ token, basePath, ...config }) => ({
  apiKey: token && ((key) => key === "Authorization" && `token ${token}`),
  basePath: basePath.replace(/\/+$/, ""),
  ...config
})
