import ky from 'ky'
import { API, LOCAL_STORAGE } from '@/config'

export const $api = ky.create({
  prefixUrl: API.baseUrl,
  hooks: {
    beforeRequest: [
      request => request.headers.set('Authorization', `Bearer ${LOCAL_STORAGE.accessToken}`),
    ],
  },
})
