import styled from '@emotion/styled'
import React, { useEffect, useRef, useState } from 'react'

declare global {
  interface Window {
    adsbygoogle: any[]
  }
}

interface GoogleAdsenseProps {
  slot: string
  width?: string
  height?: string
}

// AdSense 스크립트를 한 번만 로드하는 싱글턴
let scriptLoaded = false
const loadAdsenseScript = () => {
  if (scriptLoaded) return
  if (document.querySelector('script[src*="adsbygoogle"]')) {
    scriptLoaded = true
    return
  }

  const script = document.createElement('script')
  script.src =
    'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2173037699636228'
  script.async = true
  script.crossOrigin = 'anonymous'
  document.head.appendChild(script)
  scriptLoaded = true
}

const GoogleAdsense = ({
  slot,
  width = '728px',
  height = '90px',
}: GoogleAdsenseProps) => {
  // key를 통해 페이지 이동 시 <ins>를 새로 마운트하여 AdSense가 새 광고를 채우도록 함
  const [adKey, setAdKey] = useState(0)
  const advertRef = useRef<HTMLModElement>(null)
  const hasInitialized = useRef(false)

  // 페이지 이동 시 컴포넌트가 remount되면 key를 갱신하여 <ins>를 새로 생성
  useEffect(() => {
    hasInitialized.current = false
    setAdKey((prev) => prev + 1)
  }, [slot])

  useEffect(() => {
    // 컴포넌트 마운트 시 스크립트를 1회만 로드 (async 속성으로 비동기 다운로드)
    loadAdsenseScript()

    // 뷰포트 근처 진입 시 push 호출
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasInitialized.current) {
          hasInitialized.current = true
          observer.disconnect()

          try {
            ;(window.adsbygoogle = window.adsbygoogle || []).push({})
          } catch (error) {
            console.error('AdSense 초기화 중 에러 발생:', error)
          }
        }
      },
      { rootMargin: '200px' },
    )

    if (advertRef.current) {
      observer.observe(advertRef.current)
    }

    return () => observer.disconnect()
  }, [adKey])

  return (
    <AdContainer>
      <ins
        key={adKey}
        ref={advertRef}
        className="adsbygoogle"
        style={{
          display: 'inline-block',
          width,
          height,
          textDecoration: 'none',
        }}
        data-ad-client="ca-pub-2173037699636228"
        data-ad-slot={slot}
      >
        <span>No Filled</span>
      </ins>
    </AdContainer>
  )
}

export default GoogleAdsense

const AdContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;

  .adsbygoogle span {
    display: none !important;
  }

  .adsbygoogle[data-ad-status='unfilled'] span {
    display: block !important;
  }
`
