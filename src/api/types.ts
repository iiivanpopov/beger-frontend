import type { UseMutationOptions, UseQueryOptions } from '@tanstack/react-query'
import type { HTTPError } from 'ky'
import type { AnyFunction } from '@/shared/types'

export interface QuerySettings<Func extends AnyFunction = AnyFunction> {
  options?: Omit<
    UseQueryOptions<
      Awaited<ReturnType<Func>>,
      HTTPError<ApiError>,
      Awaited<ReturnType<Func>>,
      any
    >,
    'queryKey'
  >
}

export interface MutationSettings<Params = void, Func extends AnyFunction = AnyFunction> {
  options?: UseMutationOptions<
    Awaited<ReturnType<Func>>,
    HTTPError<ApiError>,
    Params,
    any
  >
}

export interface ApiError {
  message: string
  success: false
}

export interface ApiResponse<T> {
  data: T
  success: true
}

export type UserRole = 'admin' | 'user'

export interface User {
  id: number
  fullName: string
  userName: string
  role: UserRole
  createdAt: Date
}

export type GetCurrentUserResponse = ApiResponse<User>

export interface LoginBody {
  userName: string
  password: string
}

export type LoginResponse = ApiResponse<{
  tokens: { accessToken: string, refreshToken: string }
  user: User
}>
