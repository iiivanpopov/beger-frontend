import { useEffect } from 'react'

export function useFloatingPosition(
  toRef: React.RefObject<HTMLElement>,
  targetRef: React.RefObject<HTMLElement>,
  offset: { x: number, y: number } = { x: 0, y: 0 },
  disabled?: boolean,
) {
  useEffect(() => {
    if (disabled)
      return

    const updatePosition = () => {
      const to = toRef.current
      const target = targetRef.current

      if (!to || !target)
        return

      const targetRect = to.getBoundingClientRect()

      let x = targetRect.left + targetRect.width / 2 - target.clientWidth / 2 + offset.x + window.scrollX
      let y = targetRect.bottom + offset.y + window.scrollY

      x = Math.max(window.scrollX, Math.min(x, window.scrollX + window.innerWidth - target.clientWidth))
      y = Math.max(window.scrollY, Math.min(y, window.scrollY + window.innerHeight - target.clientHeight))

      target.style.transform = `translate(${x}px, ${y}px)`
    }

    const frame = requestAnimationFrame(updatePosition)

    window.addEventListener('resize', updatePosition)
    window.addEventListener('scroll', updatePosition, true)

    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('resize', updatePosition)
      window.removeEventListener('scroll', updatePosition, true)
    }
  }, [toRef, targetRef, offset, disabled])
}
