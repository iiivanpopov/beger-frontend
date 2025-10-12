import type { Options } from 'ky'
import type { ApiResponse, LoginBody, LoginResponse } from '@/api/types'
import { $api } from '@/api/instance'

export type LoginParams = LoginBody

export async function login({ params, config }: { params: LoginParams, config?: Options }) {
  return await $api.post<LoginResponse>('auth/login', {
    json: params,
    ...config,
  }).json()
}

export async function logout({ config }: { config?: Options } = {}) {
  return await $api.post<ApiResponse<void>>('auth/logout', {
    ...config,
  }).json()
}
