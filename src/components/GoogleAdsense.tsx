import React, { useEffect } from 'react'

declare global {
  interface Window {
    adsbygoogle: any[]
  }
}

interface GoogleAdsenseProps {
  slot: string
}

const GoogleAdsense = ({ slot }: GoogleAdsenseProps) => {
  useEffect(() => {
    try {
      ;(window.adsbygoogle = window.adsbygoogle || []).push({})
    } catch (error) {
      console.error('AdSense 초기화 중 에러 발생:', error)
    }
  }, [])

  return (
    <>
      <script
        async
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2173037699636228"
        crossOrigin="anonymous"
      />
      <ins
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client="ca-pub-2173037699636228"
        data-ad-slot={slot}
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
      <script>{`(adsbygoogle = window.adsbygoogle || []).push({});`}</script>
    </>
  )
}

export default GoogleAdsense
