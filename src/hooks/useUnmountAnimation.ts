import { useEffect, useState } from 'react'

export default function useUnmountAnimation(codition: boolean) {
  const [isCompleted, setIsCompleted] = useState(false)

  const isRenderCodition = isCompleted || codition
  const triggerAnimation = isCompleted && codition

  const handleTransitionEnd = () => {
    if (!codition) setIsCompleted(false)
  }

  useEffect(() => {
    let timeoutId: any

    if (codition) timeoutId = setIsCompleted(true)
    return () => clearTimeout(timeoutId)
  }, [codition])

  return { isRenderCodition, handleTransitionEnd, triggerAnimation }
}
