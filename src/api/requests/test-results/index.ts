import type { Options } from 'ky'
import type { CreateTestResultBody, CreateTestResultResponse, DeleteTestResultResponse, GetAllTestResultsResponse, GetUserTestResultsResponse, PaginationQuery } from '@/api/types'
import { $api } from '@/api/instance'

export type GetAllTestResultsParams = PaginationQuery
export interface GetUserTestResultsParams extends PaginationQuery {
  id: string
}
export type CreateTestResultParams = CreateTestResultBody
export interface DeleteTestResultParams {
  id: string

}

export async function getAllTestResults({ params, config }: { params?: GetAllTestResultsParams, config?: Options } = {}) {
  return await $api.get<GetAllTestResultsResponse>(`test-results`, {
    searchParams: { offset: params?.offset, limit: params?.limit },
    ...config,
  }).json()
}

export async function getUserTestResults({ params, config }: { params: GetUserTestResultsParams, config?: Options }) {
  return await $api.get<GetUserTestResultsResponse>(`users/${params.id}/test-results`, {
    searchParams: { offset: params.offset, limit: params.limit },
    ...config,
  }).json()
}

export async function createTestResult({ params, config }: { params: CreateTestResultParams, config?: Options }) {
  return await $api.post<CreateTestResultResponse>('test-results', {
    json: params,
    ...config,
  }).json()
}

export async function deleteTestResult({ params, config }: { params: DeleteTestResultParams, config?: Options }) {
  return await $api.delete<DeleteTestResultResponse>(`test-results/${params.id}`, {
    ...config,
  }).json()
}
