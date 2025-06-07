import { useCallback } from 'react'

// Declare gtag in the global scope
declare global {
  interface Window {
    gtag: (event: string, action: string, params: Record<string, any>) => void
  }
}

interface EventParameters {
  [key: string]: string | number | boolean | undefined
}

export function useAnalytics() {
  const isClient = typeof window !== 'undefined'
  const isDevelopment = process.env.NODE_ENV === 'development'

  const trackEvent = useCallback(
    (eventName: string, parameters: EventParameters = {}) => {
      if (!isClient) {
        return
      }

      if (isDevelopment) {
        console.log('📊 GA Event:', eventName, parameters)
        return
      }

      if (typeof window.gtag === 'function') {
        try {
          window.gtag('event', eventName, parameters)
        } catch (error) {
          console.error('GA tracking error:', error)
        }
      }
    },
    [isClient, isDevelopment],
  )

  return { trackEvent }
}
