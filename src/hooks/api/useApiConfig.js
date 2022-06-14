

export const useApiConfig = ({ token, basePath, ...config }) => token && ({
  apiKey: ((key) => key === "Authorization" && `token ${token}`),
  basePath: basePath.replace(/\/+$/, ""),
  ...config
})

