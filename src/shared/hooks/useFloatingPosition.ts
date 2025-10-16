import type { RefObject } from 'react'
import { useLayoutEffect } from 'react'
import { calculateFloatingPosition, getElementRect } from '@/shared/utils'

export function useFloatingPosition(
  anchorRef: RefObject<HTMLElement>,
  floatingRef: RefObject<HTMLElement>,
  offset: { x: number, y: number } = { x: 0, y: 0 },
  disabled?: boolean,
) {
  useLayoutEffect(() => {
    if (disabled)
      return

    const updatePosition = () => {
      const anchor = anchorRef.current
      const floating = floatingRef.current
      if (!anchor || !floating)
        return

      const anchorRect = getElementRect(anchor)
      const floatingRect = getElementRect(floating)
      const { x, y } = calculateFloatingPosition(anchorRect, floatingRect, offset)
      floating.style.transform = `translate(${x}px, ${y}px)`
    }

    updatePosition()
    window.addEventListener('resize', updatePosition)
    window.addEventListener('scroll', updatePosition, true)

    return () => {
      window.removeEventListener('resize', updatePosition)
      window.removeEventListener('scroll', updatePosition, true)
    }
  }, [anchorRef, floatingRef, offset, disabled])
}
