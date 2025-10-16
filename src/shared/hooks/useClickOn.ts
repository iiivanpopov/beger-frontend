import type { RefObject } from 'react'
import type { ClickEvent } from '@/shared/types'
import { useEffect } from 'react'
import { collectElements } from '@/shared/utils'
import { useCallbackRef } from './useCallbackRef'
import { useRegisterRefs } from './useRegisterRefs'

export function useClickOn(
  callback: (event: ClickEvent) => void,
  externalRef?: RefObject<HTMLElement> | RefObject<HTMLElement>[],
) {
  const { refs, registerRef } = useRegisterRefs<HTMLElement>()
  const callbackRef = useCallbackRef(callback)

  useEffect(() => {
    const handleClick = (e: ClickEvent) => {
      const target = e.target as HTMLElement
      const elements = collectElements(refs.current, externalRef)

      if (elements.includes(target))
        callbackRef.current(e)
    }

    document.addEventListener('click', handleClick)
    document.addEventListener('touchstart', handleClick)

    return () => {
      document.removeEventListener('click', handleClick)
      document.removeEventListener('touchstart', handleClick)
    }
  }, [callbackRef, externalRef, refs])

  return registerRef
}
