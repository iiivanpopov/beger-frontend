import type { Options } from 'ky'
import type { DeleteUserResponse, GetAllUsersResponse, GetCurrentUserResponse, PaginationQuery, UpdateUserBody, UpdateUserResponse } from '@/api/types'
import { $api } from '@/api/instance'

export type GetAllUsersParams = PaginationQuery
export interface UpdateUserParams extends UpdateUserBody {
  id: string
}
export interface DeleteUserParams {
  id: string
}

export async function getCurrentUser(config?: Options) {
  return await $api.get<GetCurrentUserResponse>('users/me', {
    ...config,
  }).json()
}

export async function getAllUsers({ params, config }: { params?: GetAllUsersParams, config?: Options } = {}) {
  return await $api.get<GetAllUsersResponse>(`users`, {
    searchParams: { offset: params?.offset, limit: params?.limit },
    ...config,
  }).json()
}

export async function updateUser({ params, config }: { params: UpdateUserParams, config?: Options }) {
  return await $api.put<UpdateUserResponse>(`users/${params.id}`, {
    json: params,
    ...config,
  }).json()
}

export async function deleteUser({ params, config }: { params: DeleteUserParams, config?: Options }) {
  return await $api.delete<DeleteUserResponse>(`users/${params.id}`, {
    ...config,
  }).json()
}
