import type { ReactNode } from 'react'
import { CheckCircleIcon, InfoIcon, TriangleAlertIcon } from 'lucide-react'
import { useToastsStore } from '@/store/toasts'

export function useToast() {
  const createToast = useToastsStore(state => state.createToast)

  const showInfo = (content: ReactNode) => createToast({
    level: 'info',
    content: <>
      <InfoIcon />
      {content}
    </>,
  })

  const showSuccess = (content: ReactNode) => createToast({
    level: 'success',
    content: <>
      <CheckCircleIcon />
      {content}
    </>,
  })

  const showError = (content: ReactNode) => createToast({
    level: 'error',
    content: <>
      <TriangleAlertIcon />
      {content}
    </>,
  })

  return {
    showInfo,
    showSuccess,
    showError,
  }
}
