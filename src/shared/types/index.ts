import type { ReactElement } from 'react'

export type AsChildProps<TDefault, TElement = HTMLElement> = (TDefault & { asChild?: false })
  | { asChild: true, children: ReactElement<TElement>, className?: never }

export type AnyFunction = (...args: any) => any
