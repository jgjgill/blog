import React, { useEffect, useState } from 'react'

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

const GoogleAdsense = ({ slot, width = '728x', height = '90px' }: GoogleAdsenseProps) => {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)

    try {
      ;(window.adsbygoogle = window.adsbygoogle || []).push({})
    } catch (error) {
      console.error('AdSense 초기화 중 에러 발생:', error)
    }
  }, [])

  if (!isClient) {
    return <div style={{ width, height }}>No Filled</div>
  }

  return (
    <>
      <script
        async
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2173037699636228"
        crossOrigin="anonymous"
      />
      <ins
        className="adsbygoogle"
        style={{ display: 'inline-block', width, height }}
        data-ad-client="ca-pub-2173037699636228"
        data-ad-slot={slot}
      />
      <script>{`(adsbygoogle = window.adsbygoogle || []).push({});`}</script>
    </>
  )
}

export default GoogleAdsense
