import { createPortal } from 'react-dom'
import { Toast } from '@/shared/ui'
import { useToastsStore } from '@/store/toasts'
import styles from './ToastsProvider.module.css'

export function ToastsProvider() {
  const { removeToast, toasts } = useToastsStore()

  return createPortal(
    <Toast.Container className={styles.toastProvider}>
      {toasts.map(({ id, level, content }) => {
        return (
          <Toast
            key={id}
            id={id}
            level={level}
            onDelete={() => removeToast(id)}
          >
            {content}
          </Toast>
        )
      })}
    </Toast.Container>,
    document.body,
  )
}
