import type { ComponentProps, Dispatch, HTMLAttributes, ReactNode, SetStateAction } from 'react'
import type { AsChildProps } from '@/shared/types'
import clsx from 'clsx'
import { useEffect, useMemo, useRef } from 'react'
import { createPortal } from 'react-dom'
import { useClickOutside, useControlledState } from '@/shared/hooks'
import { buildContext, cloneMerged } from '@/shared/utils'
import styles from './Popover.module.css'

interface PopoverContextProps {
  isOpen: boolean
  toggle: () => void
  close: () => void
  triggerRef: React.RefObject<HTMLButtonElement>
  contentRef: React.RefObject<HTMLDivElement>
}

const [PopoverContext, usePopoverContext] = buildContext<PopoverContextProps>()

interface PopoverProps {
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
      toggle: () => setOpen(!isOpen),
      close: () => setOpen(false),
      triggerRef,
      contentRef,
    }),
    [isOpen, setOpen],
  )

  return <PopoverContext value={value}>{children}</PopoverContext>
}

type PopoverTriggerProps = AsChildProps<
  ComponentProps<'button'>,
  HTMLAttributes<HTMLElement>
>

function PopoverTrigger({ children, className, asChild, ...props }: PopoverTriggerProps) {
  const { isOpen, toggle, triggerRef } = usePopoverContext()

  if (asChild) {
    return cloneMerged(children, {
      ref: triggerRef,
      onClick: toggle,
    })
  }

  return (
    <button
      {...props}
      type="button"
      className={clsx(styles.trigger, className)}
      ref={triggerRef}
      onClick={toggle}
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
    if (target !== triggerRef.current) {
      close()
    }
  }, contentRef)

  useEffect(() => {
    if (!isOpen)
      return

    const updatePosition = () => {
      const triggerRect = triggerRef.current.getBoundingClientRect()
      const contentElement = contentRef.current
      if (!contentElement)
        return

      const x = triggerRect.left + triggerRect.width / 2 - contentElement.clientWidth / 2 + window.scrollX
      const y = triggerRect.bottom + 8 + window.scrollY

      contentElement.style.transform = `translate(${x}px, ${y}px)`
    }

    const frame = requestAnimationFrame(updatePosition)

    window.addEventListener('resize', updatePosition)
    window.addEventListener('scroll', updatePosition, true)

    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('resize', updatePosition)
      window.removeEventListener('scroll', updatePosition, true)
    }
  }, [contentRef, isOpen, triggerRef])

  if (!isOpen) {
    return null
  }

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
