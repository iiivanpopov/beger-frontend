import { createContext, use } from 'react'

export function buildContext<T>(displayName: string = 'Context') {
  const Context = createContext<T>(null!)

  function useContext() {
    const context = use(Context)
    if (!context) {
      throw new Error(`use${displayName} must be used within ${displayName}`)
    }
    return context
  }

  return [Context, useContext] as const
}
