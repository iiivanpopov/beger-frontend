export const LOCAL_STORAGE = {
  accessToken: 'accessToken',
  refreshToken: 'refreshToken',
}
export const API = {
  baseUrl: import.meta.env.VITE_PUBLIC_BASE_URL,
  headers: {
    accessToken: 'Authorization',
    refreshToken: 'X-Refresh-Token',
  },
}
