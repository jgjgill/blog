import { useEffect, useState } from 'react'

export default function useAnimation(codition: boolean) {
  const [isCompleted, setIsCompleted] = useState(false)

  const isRenderCodition = isCompleted || codition
  const triggerAnimation = isCompleted && codition

  const handleTransitionEnd = () => {
    if (!codition) setIsCompleted(false)
  }

  useEffect(() => {
    let timeoutId: any

    if (codition) timeoutId = setTimeout(() => setIsCompleted(true), 500)
    return () => clearTimeout(timeoutId)
  }, [codition])

  return { isRenderCodition, handleTransitionEnd, triggerAnimation }
}
