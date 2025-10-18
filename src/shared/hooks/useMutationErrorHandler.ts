import { useToast } from '@/shared/hooks'
import { createErrorHandler } from '@/shared/utils'

export function useMutationErrorHandler() {
  const { showError, showSuccess } = useToast()

  const onError = createErrorHandler(showError)

  const onSuccess = (message: string, callback?: () => void) => {
    showSuccess(message)
    callback?.()
  }

  return { onError, onSuccess }
}
