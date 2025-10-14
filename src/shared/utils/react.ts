import type { MouseEvent, ReactNode, RefObject } from 'react'
import { cloneElement, createContext, isValidElement, use } from 'react'

interface PropsWithOnClick {
  onClick?: (event: MouseEvent) => void
}

export function cloneMerged<P extends object>(
  child: ReactNode,
  newProps: Partial<P>,
): ReactNode {
  if (!isValidElement(child))
    return child

  const childProps = child.props as P
  const mergedProps: P = { ...childProps, ...newProps }

  if ('onClick' in childProps && 'onClick' in newProps) {
    const childOnClick = (childProps as PropsWithOnClick).onClick
    const newOnClick = (newProps as PropsWithOnClick).onClick

    if (childOnClick || newOnClick) {
      (mergedProps as PropsWithOnClick).onClick = (event: MouseEvent) => {
        childOnClick?.(event)
        newOnClick?.(event)
      }
    }
  }

  // eslint-disable-next-line react/no-clone-element
  return cloneElement(child, mergedProps)
}

export function buildContext<T>() {
  const Context = createContext<T | undefined>(undefined)

  function useMyContext(): T {
    const context = use(Context)
    if (context === undefined) {
      throw new Error('useMyContext must be used within a Provider')
    }
    return context
  }

  return [Context, useMyContext] as const
}

export function collectElements<T extends HTMLElement>(
  ...sources: (T | RefObject<T> | RefObject<T>[] | Set<T> | T[] | null | undefined)[]
): T[] {
  const elements: T[] = []

  sources.forEach((source) => {
    if (!source)
      return

    if (source instanceof HTMLElement) {
      elements.push(source as T)
      return
    }

    if (source instanceof Set) {
      elements.push(...Array.from(source))
      return
    }

    if (Array.isArray(source)) {
      source.forEach((item) => {
        if (item && 'current' in item && item.current) {
          elements.push(item.current)
        }
        else if (item instanceof HTMLElement) {
          elements.push(item as T)
        }
      })
      return
    }

    if ('current' in source && source.current) {
      elements.push(source.current)
    }
  })

  return elements
}
