import type { ButtonHTMLAttributes, ComponentProps, Dispatch, HTMLAttributes, ReactNode, RefObject, SetStateAction } from 'react'
import type { AsChildProps } from '@/shared/types'
import clsx from 'clsx'
import { useMemo, useRef } from 'react'
import { createPortal } from 'react-dom'
import { useClickOutside } from '@/shared/hooks'
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

export type ModalContentProps = AsChildProps<
  ComponentProps<'div'>,
  HTMLAttributes<HTMLDivElement>
>

function ModalContent({ children, asChild, className, ...props }: ModalContentProps) {
  const { isOpen, setIsOpen, triggerRef } = useModalContext()

  const ref = useClickOutside<HTMLDivElement>((e) => {
    if (e.target !== triggerRef.current)
      setIsOpen(false)
  })

  if (!isOpen)
    return null

  const content = asChild
    ? cloneMerged(children, { ref })
    : (
        <div
          {...props}
          ref={ref}
          className={clsx(
            className,
          )}
        >
          {children}
        </div>
      )

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
