import type { Options } from 'ky'
import type { GetCurrentUserResponse } from '@/api/types'
import { $api } from '@/api/instance'

export async function getCurrentUser(config?: Options) {
  return await $api.get<GetCurrentUserResponse>('users/me', {
    ...config,
  }).json()
}
