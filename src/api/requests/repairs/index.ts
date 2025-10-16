import type { Options } from 'ky'
import type { CreateRepairBody, CreateRepairResponse, DeleteRepairResponse, GetAllRepairsResponse, GetSelfRepairsResponse, PaginationQuery } from '@/api/types'
import { $api } from '@/api/instance'

export type GetAllRepairsParams = PaginationQuery
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

export async function getSelfRepairs({ config }: { config?: Options } = {}) {
  return await $api.get<GetSelfRepairsResponse>(`repairs/me`, {
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
