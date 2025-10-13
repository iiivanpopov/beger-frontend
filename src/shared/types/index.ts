import type { RedirectOptions } from '@tanstack/react-router'
import type { ReactElement } from 'react'
import type { AppRouter } from '@/main'

export type AsChildProps<TDefault, TElement = HTMLElement> = (TDefault & { asChild?: false })
  | { asChild: true, children: ReactElement<TElement>, className?: never }

export type AnyFunction = (...args: any) => any

export type PathRoute = RedirectOptions<AppRouter>['to']
