import type { RedirectOptions } from '@tanstack/react-router'
import type { AppRouter } from '@/main'

export type AnyFunction = (...args: any[]) => any

export type RouterPath = RedirectOptions<AppRouter>['to']

export type ClickEvent = MouseEvent | TouchEvent
