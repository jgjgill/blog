import React, { useEffect, useRef } from 'react'

const Comment = () => {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const script = document.createElement('script')
    script.src = 'https://giscus.app/client.js'
    script.crossOrigin = 'anonymous'
    script.async = true

    Object.entries({
      'data-repo': 'jgjgill/blog',
      'data-repo-id': 'R_kgDOJH4dKA',
      'data-category': 'Comments',
      'data-category-id': 'DIC_kwDOJH4dKM4CU19g',
      'data-mapping': 'pathname',
      'data-strict': '0',
      'data-reactions-enabled': '1',
      'data-emit-metadata': '0',
      'data-input-position': 'bottom',
      'data-theme': 'transparent_dark',
      'data-lang': 'ko',
      'data-loading': 'lazy',
    }).forEach(([key, value]) => {
      script.setAttribute(key, value)
    })

    ref.current?.appendChild(script)
  }, [])

  return <div ref={ref} />
}

export default Comment
