import type { RefreshResponse } from './types'
import ky from 'ky'
import { apiConfig } from '@/shared/config'
import { authStorage } from '@/shared/utils'

export const $api = ky.create({
  prefixUrl: apiConfig.baseUrl,
  hooks: {
    beforeRequest: [
      (request) => {
        const access = authStorage.getAccessToken()
        const refresh = authStorage.getRefreshToken()

        if (access)
          request.headers.set(apiConfig.headers.accessToken, `Bearer ${access}`)

        if (refresh)
          request.headers.set(apiConfig.headers.refreshToken, `Bearer ${refresh}`)

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
            const refreshResponse = await ky.post(`${apiConfig.baseUrl}/auth/refresh`, {
              headers: {
                [apiConfig.headers.refreshToken]: `Bearer ${refreshToken}`,
              },
            }).json<RefreshResponse>()

            authStorage.setTokens(refreshResponse.data.accessToken, refreshResponse.data.refreshToken)

            return ky(request.url, {
              ...options,
              prefixUrl: '', // fix double baseUrl
              headers: {
                ...Object.fromEntries(request.headers),
                [apiConfig.headers.accessToken]: `Bearer ${refreshResponse.data.accessToken}`,
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
