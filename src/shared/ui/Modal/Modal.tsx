import type { ComponentProps, Dispatch, ReactNode, RefObject, SetStateAction } from 'react'
import type { AsChildProps } from '@/shared/types'
import clsx from 'clsx'
import { useMemo, useRef } from 'react'
import { createPortal } from 'react-dom'
import { useClickOn } from '@/shared/hooks'
import { buildContext, cloneMerged } from '@/shared/utils'
import styles from './Modal.module.css'

export interface ModalContextProps {
  isOpen: boolean
  setIsOpen: Dispatch<SetStateAction<boolean>>
  triggerRef: RefObject<HTMLButtonElement>
}

const [ModalContext, useModalContext] = buildContext<ModalContextProps>()

export interface ModalProps {
  isOpen: boolean
  setIsOpen: Dispatch<SetStateAction<boolean>>
  children: ReactNode
}

export function Modal({ children, isOpen, setIsOpen }: ModalProps) {
  const triggerRef = useRef<HTMLButtonElement>(null!)

  const contextValue = useMemo(() => ({
    isOpen,
    setIsOpen,
    triggerRef,
  }), [isOpen, setIsOpen])

  return (
    <ModalContext value={contextValue}>
      {children}
    </ModalContext>
  )
}

export type ModalTriggerProps = AsChildProps<ComponentProps<'button'>>

export function ModalTrigger({ asChild, children, className, ...props }: ModalTriggerProps) {
  const { setIsOpen, triggerRef } = useModalContext()

  if (asChild) {
    return cloneMerged(children, {
      ref: triggerRef,
      onClick: () => setIsOpen(true),
    })
  }

  return (
    <button
      {...props}
      ref={triggerRef}
      type="button"
      className={clsx(styles.trigger, className)}
      onClick={() => setIsOpen(true)}
    >
      {children}
    </button>
  )
}

export interface ModalContentProps {
  children: ReactNode
  className?: string
}

export function ModalContent({ children, className }: ModalContentProps) {
  const { isOpen, setIsOpen } = useModalContext()
  const register = useClickOn(() => setIsOpen(false))

  if (!isOpen)
    return null

  return createPortal(
    <div
      className={styles.backdrop}
      ref={register}
    >
      <div className={clsx(styles.content, className)}>
        {children}
      </div>
    </div>,
    document.body,
  )
}

Modal.Trigger = ModalTrigger
Modal.Content = ModalContent
