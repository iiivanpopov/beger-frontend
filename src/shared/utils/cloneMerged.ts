/* eslint-disable react/no-clone-element */
import type { MouseEvent, ReactElement } from 'react'
import { cloneElement, isValidElement } from 'react'

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

  return cloneElement(child, mergedProps)
}
