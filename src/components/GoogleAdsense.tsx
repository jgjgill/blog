import styled from '@emotion/styled'
import React, { useEffect, useRef } from 'react'

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

const GoogleAdsense = ({
  slot,
  width = '728px',
  height = '90px',
}: GoogleAdsenseProps) => {
  const advertRef = useRef<HTMLModElement>(null)

  useEffect(() => {
    // AdSense 스크립트 로드
    const script = document.createElement('script')
    script.src =
      'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2173037699636228'
    script.async = true
    script.crossOrigin = 'anonymous'
    document.head.appendChild(script)

    // 광고가 이미 로드되었는지 확인
    const alreadyLoaded = advertRef.current?.getAttribute('data-ad-status')

    if (!alreadyLoaded) {
      try {
        ;(window.adsbygoogle = window.adsbygoogle || []).push({})
      } catch (error) {
        console.error('AdSense 초기화 중 에러 발생:', error)
      }
    }

    return () => {
      // 컴포넌트 언마운트 시 스크립트 제거
      document.head.removeChild(script)
    }
  }, [])

  return (
    <AdContainer height={height}>
      <ins
        ref={advertRef}
        className="adsbygoogle"
        style={{ display: 'inline-block', width, height, textDecoration: 'none' }}
        data-ad-client="ca-pub-2173037699636228"
        data-ad-slot={slot}
      >
        <span>No Filled</span>
      </ins>
    </AdContainer>
  )
}

export default GoogleAdsense

const AdContainer = styled.div<{ height: string }>`
  width: 100%;
  height: ${(props) => props.height};

  .adsbygoogle span {
    display: none !important;
  }

  .adsbygoogle[data-ad-status='unfilled'] span {
    display: block !important;
  }
`
