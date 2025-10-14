import type { RefreshResponse } from './types'
import ky from 'ky'
import { API } from '@/config'
import { authStorage } from '@/shared/utils'

export const $api = ky.create({
  prefixUrl: API.baseUrl,
  hooks: {
    beforeRequest: [
      (request) => {
        const access = authStorage.getAccessToken()
        const refresh = authStorage.getRefreshToken()

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
          const refreshToken = authStorage.getRefreshToken()
          if (!refreshToken)
            return response

          try {
            const refreshResponse = await ky.post(`${API.baseUrl}/auth/refresh`, {
              headers: {
                [API.headers.refreshToken]: `Bearer ${refreshToken}`,
              },
            }).json<RefreshResponse>()

            authStorage.setTokens(refreshResponse.data.accessToken, refreshResponse.data.refreshToken)

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
            authStorage.clearTokens()
            return response
          }
        }

        return response
      },
    ],
  },
})
