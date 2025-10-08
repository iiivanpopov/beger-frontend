import type { ComponentProps, Dispatch, HTMLAttributes, ReactNode, SetStateAction } from 'react'
import type { AsChildProps } from '@/shared/types'
import clsx from 'clsx'
import { useMemo, useRef } from 'react'
import { createPortal } from 'react-dom'
import { useClickOutside, useControlledState, useFloatingPosition } from '@/shared/hooks'
import { buildContext, cloneMerged } from '@/shared/utils'
import styles from './Popover.module.css'

export interface PopoverContextProps {
  isOpen: boolean
  open: () => void
  close: () => void
  triggerRef: React.RefObject<HTMLButtonElement>
  contentRef: React.RefObject<HTMLDivElement>
}

const [PopoverContext, usePopoverContext] = buildContext<PopoverContextProps>()

export interface PopoverProps {
  external?: [
    boolean,
    Dispatch<SetStateAction<boolean>>,
  ]
  children: ReactNode
}

function Popover({ children, external }: PopoverProps) {
  const [isOpen, setOpen] = useControlledState(external, false)
  const triggerRef = useRef<HTMLButtonElement>(null!)
  const contentRef = useRef<HTMLDivElement>(null!)

  const value = useMemo(
    () => ({
      isOpen,
      open: () => setOpen(true),
      close: () => setOpen(false),
      triggerRef,
      contentRef,
    }),
    [isOpen, setOpen],
  )

  return <PopoverContext value={value}>{children}</PopoverContext>
}

export type PopoverTriggerProps = AsChildProps<
  ComponentProps<'button'>,
  HTMLAttributes<HTMLElement>
>

function PopoverTrigger({ children, className, asChild, ...props }: PopoverTriggerProps) {
  const { isOpen, open, triggerRef } = usePopoverContext()

  if (asChild) {
    return cloneMerged(children, {
      ref: triggerRef,
      onClick: (e: React.MouseEvent) => {
        e.preventDefault()
        e.stopPropagation()
        open()
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
        open()
      }}
      aria-expanded={isOpen}
    >
      {children}
    </button>
  )
}

type PopoverContentProps = ComponentProps<'div'>

function PopoverContent({ children, className, ...props }: PopoverContentProps) {
  const { contentRef, triggerRef, close, isOpen } = usePopoverContext()

  useClickOutside<HTMLDivElement>((e: MouseEvent) => {
    const target = e.target as Node
    if (!triggerRef.current?.contains(target)) {
      close()
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
