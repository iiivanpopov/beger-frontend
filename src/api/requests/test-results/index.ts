import type { Options } from 'ky'
import type { CreateTestResultBody, CreateTestResultResponse, DeleteTestResultResponse, GetAllTestResultsResponse, GetSelfTestResults, PaginationQuery } from '@/api/types'
import { $api } from '@/api/instance'

export type GetAllTestResultsParams = PaginationQuery
export type CreateTestResultParams = CreateTestResultBody
export interface DeleteTestResultParams {
  id: number
}

export async function getAllTestResults({ params, config }: { params?: GetAllTestResultsParams, config?: Options } = {}) {
  return $api.get<GetAllTestResultsResponse>(`test-results`, {
    searchParams: { offset: params?.offset, limit: params?.limit },
    ...config,
  }).json()
}

export async function getSelfTestResults({ config }: { config?: Options } = {}) {
  return $api.get<GetSelfTestResults>(`test-results/me`, {
    ...config,
  }).json()
}

export async function createTestResult({ params, config }: { params: CreateTestResultParams, config?: Options }) {
  return $api.post<CreateTestResultResponse>('test-results', {
    json: params,
    ...config,
  }).json()
}

export async function deleteTestResult({ params, config }: { params: DeleteTestResultParams, config?: Options }) {
  return $api.delete<DeleteTestResultResponse>(`test-results/${params.id}`, {
    ...config,
  }).json()
}
