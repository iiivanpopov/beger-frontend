import type { ComponentProps, Dispatch, HTMLAttributes, ReactNode, SetStateAction } from 'react'
import type { AsChildProps } from '@/shared/types'
import clsx from 'clsx'
import { useMemo, useRef } from 'react'
import { createPortal } from 'react-dom'
import { useClickOutside, useFloatingPosition } from '@/shared/hooks'
import { buildContext, cloneMerged } from '@/shared/utils'
import styles from './Popover.module.css'

export interface PopoverContextProps {
  isOpen: boolean
  setIsOpen: Dispatch<SetStateAction<boolean>>
  triggerRef: React.RefObject<HTMLButtonElement>
  contentRef: React.RefObject<HTMLDivElement>
}

const [PopoverContext, usePopoverContext] = buildContext<PopoverContextProps>(null!)

export interface PopoverProps {
  isOpen: boolean
  setIsOpen: Dispatch<SetStateAction<boolean>>
  children: ReactNode
}

function Popover({ children, isOpen, setIsOpen }: PopoverProps) {
  const triggerRef = useRef<HTMLButtonElement>(null!)
  const contentRef = useRef<HTMLDivElement>(null!)

  const contextValue = useMemo(
    () => ({
      isOpen,
      setIsOpen,
      triggerRef,
      contentRef,
    }),
    [isOpen, setIsOpen],
  )

  return <PopoverContext value={contextValue}>{children}</PopoverContext>
}

export type PopoverTriggerProps = AsChildProps<
  ComponentProps<'button'>,
  HTMLAttributes<HTMLElement>
>

function PopoverTrigger({ children, className, asChild, ...props }: PopoverTriggerProps) {
  const { isOpen, setIsOpen, triggerRef } = usePopoverContext()

  if (asChild) {
    return cloneMerged(children, {
      ref: triggerRef,
      onClick: (e: React.MouseEvent) => {
        e.preventDefault()
        e.stopPropagation()
        setIsOpen(true)
      },
    })
  }

  return (
    <button
      {...props}
      type="button"
      className={clsx(styles.trigger, className)}
      ref={triggerRef}
      onClick={(e) => {
        e.preventDefault()
        e.stopPropagation()
        setIsOpen(true)
      }}
      aria-expanded={isOpen}
    >
      {children}
    </button>
  )
}

type PopoverContentProps = ComponentProps<'div'>

function PopoverContent({ children, className, ...props }: PopoverContentProps) {
  const { contentRef, triggerRef, setIsOpen, isOpen } = usePopoverContext()

  useClickOutside<HTMLDivElement>((e: MouseEvent) => {
    const target = e.target as Node
    if (!triggerRef.current?.contains(target)) {
      setIsOpen(false)
    }
  }, contentRef)

  useFloatingPosition(triggerRef, contentRef, {
    y: 6,
    x: 0,
  }, !isOpen)

  if (!isOpen)
    return null

  return createPortal(
    <div {...props} ref={contentRef} className={clsx(styles.content, className)}>
      {children}
    </div>,
    document.body,
  )
}

Popover.Trigger = PopoverTrigger
Popover.Content = PopoverContent

export { Popover }
