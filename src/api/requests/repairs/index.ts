import type { Options } from 'ky'
import type { CreateRepairBody, CreateRepairResponse, DeleteRepairResponse, GetAllRepairsResponse, GetUserRepairsResponse, PaginationQuery } from '@/api/types'
import { $api } from '@/api/instance'

export type GetAllRepairsParams = PaginationQuery
export interface GetUserRepairsParams extends PaginationQuery {
  id: string
}
export type CreateRepairParams = CreateRepairBody
export interface DeleteRepairParams {
  id: string
}

export async function getAllRepairs({ params, config }: { params?: GetAllRepairsParams, config?: Options } = {}) {
  return await $api.get<GetAllRepairsResponse>(`repairs`, {
    searchParams: { offset: params?.offset, limit: params?.limit },
    ...config,
  }).json()
}

export async function getUserRepairs({ params, config }: { params: GetUserRepairsParams, config?: Options }) {
  return await $api.get<GetUserRepairsResponse>(`users/${params.id}/repairs`, {
    searchParams: { offset: params.offset, limit: params.limit },
    ...config,
  }).json()
}

export async function createRepair({ params, config }: { params: CreateRepairParams, config?: Options }) {
  return await $api.post<CreateRepairResponse>('repairs', {
    json: params,
    ...config,
  }).json()
}

export async function deleteRepair({ params, config }: { params: DeleteRepairParams, config?: Options }) {
  return await $api.delete<DeleteRepairResponse>(`repairs/${params.id}`, {
    ...config,
  }).json()
}
