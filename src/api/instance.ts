import ky from 'ky'
import { API, LOCAL_STORAGE } from '@/config'

export const $api = ky.create({
  prefixUrl: API.baseUrl,
  hooks: {
    beforeRequest: [
      (request) => {
        const access = localStorage.getItem(LOCAL_STORAGE.accessToken)
        const refresh = localStorage.getItem(LOCAL_STORAGE.refreshToken)

        if (access)
          request.headers.set(API.headers.accessToken, `Bearer ${access}`)

        if (refresh)
          request.headers.set(API.headers.refreshToken, `Bearer ${refresh}`)

        return request
      },
    ],
    afterResponse: [
      async (request, options, response) => {
        if (response.status === 401 && !new Headers(options.headers).has('X-Is-Retry')) {
          const refreshToken = localStorage.getItem(LOCAL_STORAGE.refreshToken)
          if (!refreshToken)
            return response

          try {
            const refreshResponse = await ky.post(`${API.baseUrl}/auth/refresh`, {
              headers: {
                [API.headers.refreshToken]: `Bearer ${refreshToken}`,
              },
            }).json<{ data: { accessToken: string, refreshToken: string } }>()

            localStorage.setItem(LOCAL_STORAGE.accessToken, refreshResponse.data.accessToken)
            localStorage.setItem(LOCAL_STORAGE.refreshToken, refreshResponse.data.refreshToken)

            return ky(request.url, {
              ...options,
              headers: {
                ...Object.fromEntries(request.headers),
                [API.headers.accessToken]: `Bearer ${refreshResponse.data.accessToken}`,
                'X-Is-Retry': 'true',
              },
            })
          }
          catch {
            localStorage.removeItem(LOCAL_STORAGE.accessToken)
            localStorage.removeItem(LOCAL_STORAGE.refreshToken)
            return response
          }
        }

        return response
      },
    ],
  },
})
