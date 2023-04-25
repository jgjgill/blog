import { useEffect, useState } from 'react'
import { BeforeInstallPromptEvent } from 'types/custom'

export default function useA2HS() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(
    null,
  )

  const install = () => {
    if (deferredPrompt === null) return

    deferredPrompt.prompt()
    deferredPrompt.userChoice.then(() => clearPrompt())
  }
  const clearPrompt = () => {
    setDeferredPrompt(null)
  }

  useEffect(() => {
    const handler = (e: BeforeInstallPromptEvent) => {
      e.preventDefault()
      setDeferredPrompt(e)
    }

    window.addEventListener('beforeinstallprompt', handler as any)
    return () => {
      window.removeEventListener('beforeinstallprompt', handler as any)
    }
  }, [])

  return { deferredPrompt, install, clearPrompt }
}
