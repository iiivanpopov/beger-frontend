import ky from 'ky'
import { API, LOCAL_STORAGE } from '@/config'

export const $api = ky.create({
  prefixUrl: API.baseUrl,
  hooks: {
    beforeRequest: [
      (request) => {
        request.headers.set(
          API.headers.accessToken,
          `Bearer ${localStorage.getItem(LOCAL_STORAGE.accessToken)}`,
        )
        request.headers.set(
          API.headers.refreshToken,
          `Bearer ${localStorage.getItem(LOCAL_STORAGE.refreshToken)}`,
        )
      },
    ],
  },
})
