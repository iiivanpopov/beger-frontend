import type { AnyFunction } from '@/shared/types'
import { useEffect, useRef } from 'react'

export function useCallbackRef<T extends AnyFunction>(callback: T) {
  const callbackRef = useRef(callback)

  useEffect(() => {
    callbackRef.current = callback
  }, [callback])

  return callbackRef
}
