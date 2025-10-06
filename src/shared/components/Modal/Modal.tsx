import type { ButtonHTMLAttributes, ComponentProps, Dispatch, HTMLAttributes, ReactNode, RefObject, SetStateAction } from 'react'
import type { AsChildProps } from '@/shared/types'
import clsx from 'clsx'
import { useMemo, useRef } from 'react'
import { createPortal } from 'react-dom'
import { useClickOutside, useControlledState } from '@/shared/hooks'
import { buildContext, cloneMerged } from '@/shared/utils'
import styles from './Modal.module.css'

interface ModalContextProps {
  isOpen: boolean
  open: () => void
  close: () => void
  triggerRef: RefObject<HTMLButtonElement>
}

const [ModalContext, useModalContext] = buildContext<ModalContextProps>()

interface ModalProps {
  children: ReactNode
  external?: [
    boolean,
    Dispatch<SetStateAction<boolean>>,
  ]
}

function Modal({ children, external }: ModalProps) {
  const [isOpen, setIsOpen] = useControlledState(external, false)
  const triggerRef = useRef<HTMLButtonElement>(null!)

  const value = useMemo(() => ({
    isOpen,
    open: () => setIsOpen(true),
    close: () => setIsOpen(false),
    triggerRef,
  }), [isOpen, setIsOpen])

  return (
    <ModalContext value={value}>
      {children}
    </ModalContext>
  )
}

type ModalTriggerProps = AsChildProps<
  ComponentProps<'button'>,
  ButtonHTMLAttributes<HTMLButtonElement>
>

function ModalTrigger({ asChild, children, className, ...props }: ModalTriggerProps) {
  const { open, triggerRef } = useModalContext()

  if (asChild) {
    return cloneMerged(children, {
      ref: triggerRef,
      onClick: open,
    })
  }

  return (
    <button
      {...props}
      ref={triggerRef}
      type="button"
      className={clsx(styles.trigger, className)}
      onClick={open}
    >
      {children}
    </button>
  )
}

type ModalContentProps = AsChildProps<
  ComponentProps<'div'>,
  HTMLAttributes<HTMLDivElement>
>

function ModalContent({ children, asChild, className, ...props }: ModalContentProps) {
  const { isOpen, close, triggerRef } = useModalContext()

  const ref = useClickOutside<HTMLDivElement>((e) => {
    const target = e.target as Node
    if (target !== triggerRef.current)
      close()
  })

  if (!isOpen)
    return null

  const content = asChild
    ? cloneMerged(children, { ref })
    : <div {...props} ref={ref} className={clsx(styles.content, className)}>{children}</div>

  return createPortal(
    <div className={styles.backdrop}>
      {content}
    </div>,
    document.body,
  )
}

Modal.Trigger = ModalTrigger
Modal.Content = ModalContent

export { Modal }
