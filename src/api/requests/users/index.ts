import type { Options } from 'ky'
import type { ApiResponse, User } from '@/api/types'
import { $api } from '@/api/instance'

export async function getCurrentUser(config?: Options) {
  return await $api.get<ApiResponse<User>>('/users/me', {
    ...config,
  }).json()
}
