import type { RedirectOptions } from '@tanstack/react-router'
import type { ReactNode } from 'react'
import type { AppRouter } from '@/main'

export type AsChildProps<T>
  = ({ asChild?: false } & T)
    | {
      asChild: true
      className?: never
      children: ReactNode
    }

export type AnyFunction = (...args: any[]) => any

export type RouterPath = RedirectOptions<AppRouter>['to']

export type ClickEvent = MouseEvent | TouchEvent
