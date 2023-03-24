import { useCallback, useEffect, useRef, useState } from 'react'

export default function useIntersectionObserver(
  maxPage: number,
  options?: IntersectionObserverInit,
) {
  const [page, setPage] = useState<number>(5)
  const ref = useRef<HTMLDivElement>(null)

  const callback = useCallback(
    (entries: IntersectionObserverEntry[], observer: IntersectionObserver) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && page < maxPage) {
          setPage((prev) => prev + 5)
        }
      })
    },
    [page, maxPage],
  )

  useEffect(() => {
    if (!ref.current) return

    const observer = new IntersectionObserver(callback, options)

    observer.observe(ref.current)

    return () => observer.disconnect()
  }, [callback, options, ref])

  return { ref, page }
}
