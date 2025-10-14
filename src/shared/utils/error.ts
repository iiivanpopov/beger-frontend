import type { HTTPError } from 'ky'
import type { ReactNode } from 'react'
import type { ApiError } from '@/api'

export async function extractErrorMessage(error: HTTPError<ApiError>): Promise<string> {
  if (!error.response) {
    return error.message
  }

  try {
    const response = await error.response.json()
    return response.message || error.message
  }
  catch {
    return error.message
  }
}

export function createErrorHandler(showError: (content: ReactNode) => void) {
  return async (error: HTTPError<ApiError>) => {
    const message = await extractErrorMessage(error)
    showError(message)
  }
}
