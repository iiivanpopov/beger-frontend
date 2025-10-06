import { useCallback, useEffect, useRef } from 'react'

export function useClickOutside<T extends HTMLElement>(
  callback: (e: MouseEvent) => void,
  externalRef?: React.RefObject<T>,
) {
  const internalRef = useRef<T>(null)
  const ref = externalRef ?? internalRef

  const handleClick = useCallback(
    (e: MouseEvent) => {
      if (!ref.current?.contains(e.target as Node))
        callback(e)
    },
    [callback, ref],
  )

  useEffect(() => {
    document.addEventListener('click', handleClick)
    return () => document.removeEventListener('click', handleClick)
  }, [handleClick])

  return ref
}
