import { useEffect, useMemo, useRef, useState } from 'react'

function throttle<T extends (...args: any[]) => void>(fn: T, delay: number): T {
  let lastCall = 0
  return ((...args: any[]) => {
    const now = Date.now()
    if (now - lastCall >= delay) {
      lastCall = now
      fn(...args)
    }
  }) as T
}

export function useIsViewScrollHeader(scrollY: number) {
  const [isView, setIsView] = useState(true)
  const beforeScrollY = useRef<number>(0)

  const handleScroll = useMemo(
    () =>
      throttle(() => {
        if (typeof window === 'undefined') return
        const currentScrollY = window.scrollY

        if (currentScrollY < scrollY) setIsView(true)
        else {
          beforeScrollY.current < currentScrollY ? setIsView(false) : setIsView(true)
        }

        beforeScrollY.current = currentScrollY
      }, 300),
    [scrollY],
  )

  useEffect(() => {
    if (typeof window === 'undefined') return

    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [handleScroll])

  return { isView }
}
