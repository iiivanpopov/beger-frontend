import type { RefObject } from 'react'
import { useEffectEvent, useLayoutEffect } from 'react'
import { calculateFloatingPosition, getElementRect } from '@/shared/utils'

export function useFloatingPosition(
  anchorRef: RefObject<HTMLElement>,
  floatingRef: RefObject<HTMLElement>,
  offset: { x: number, y: number } = { x: 0, y: 0 },
  disabled?: boolean,
) {
  const updatePosition = useEffectEvent(() => {
    const anchor = anchorRef.current
    const floating = floatingRef.current
    if (!anchor || !floating)
      return

    const anchorRect = getElementRect(anchor)
    const floatingRect = getElementRect(floating)
    const { x, y } = calculateFloatingPosition(anchorRect, floatingRect, offset)
    floating.style.transform = `translate(${x}px, ${y}px)`
  })

  useLayoutEffect(() => {
    if (disabled)
      return

    updatePosition()
    window.addEventListener('resize', updatePosition)
    window.addEventListener('scroll', updatePosition, true)

    return () => {
      window.removeEventListener('resize', updatePosition)
      window.removeEventListener('scroll', updatePosition, true)
    }
  }, [disabled])
}
