import type { ButtonHTMLAttributes, ComponentProps, Dispatch, ReactNode, RefObject, SetStateAction } from 'react'
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

function Modal({ children, isOpen, setIsOpen }: ModalProps) {
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

export type ModalTriggerProps = AsChildProps<
  ComponentProps<'button'>,
  ButtonHTMLAttributes<HTMLButtonElement>
>

function ModalTrigger({ asChild, children, className, ...props }: ModalTriggerProps) {
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

function ModalContent({ children, className }: ModalContentProps) {
  const { isOpen, setIsOpen } = useModalContext()
  const register = useClickOn(() => setIsOpen(false))

  if (!isOpen)
    return null

  return createPortal(
    <div
      className={clsx(styles.backdrop, className)}
      ref={register}
    >
      {children}
    </div>,
    document.body,
  )
}

Modal.Trigger = ModalTrigger
Modal.Content = ModalContent

export { Modal }
