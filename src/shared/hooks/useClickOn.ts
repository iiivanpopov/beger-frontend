import type { RefObject } from 'react'
import { useEffect } from 'react'
import { collectElements } from '@/shared/utils'
import { useCallbackRef } from './useCallbackRef'
import { useRegisterRefs } from './useRegisterRefs'

export function useClickOn(
  callback: (event: MouseEvent) => void,
  externalRef?: RefObject<HTMLElement> | RefObject<HTMLElement>[],
) {
  const { refs, registerRef } = useRegisterRefs<HTMLElement>()
  const callbackRef = useCallbackRef(callback)

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      const elements = collectElements(refs.current, externalRef)

      if (elements.includes(target))
        callbackRef.current(e)
    }

    document.addEventListener('click', handleClick)

    return () => document.removeEventListener('click', handleClick)
  }, [callbackRef, externalRef, refs])

  return registerRef
}
