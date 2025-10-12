import { createPortal } from 'react-dom'
import { Toast } from '@/shared/ui'
import { useToastsStore } from '@/store/toasts'
import styles from './ToastContainer.module.css'

export function ToastContainer() {
  const { toasts, remove } = useToastsStore()

  if (!toasts.length)
    return null

  return createPortal((
    <div className={styles.container}>
      {toasts.map(toast =>
        <Toast toast={toast} remove={remove} key={toast.id} />,
      )}
    </div>
  ),
  document.body,
  )
}
