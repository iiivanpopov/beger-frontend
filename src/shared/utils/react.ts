import type { MouseEvent, ReactElement } from 'react'
import { cloneElement, createContext, isValidElement, use } from 'react'

export function cloneMerged<T extends HTMLElement>(
  child: ReactElement<Record<string, any>>,
  newProps: Record<string, any>,
) {
  if (!isValidElement(child))
    return child

  const mergedProps = {
    ...child.props,
    ...newProps,
    onClick: (e: MouseEvent<T>) => {
      child.props.onClick?.(e)
      newProps.onClick?.(e)
    },
  }

  // eslint-disable-next-line react/no-clone-element
  return cloneElement(child, mergedProps)
}

export function buildContext<T>(init: T) {
  const Context = createContext<T>(init)

  function useContext() {
    const context = use(Context)
    if (!context) {
      throw new Error(`useContext must be used within context`)
    }
    return context
  }

  return [Context, useContext] as const
}
