import styled from '@emotion/styled'
import { useEffect, useState } from 'react'
import React from 'react'
import { StrictPropsWithChildren } from 'types/custom'

const TouchGuide = ({ children }: StrictPropsWithChildren) => {
  const [showGuide, setShowGuide] = useState(false)

  useEffect(() => {
    const hasVisited = localStorage.getItem('hasVisitedCard')
    if (!hasVisited) {
      const timer = setTimeout(() => {
        setShowGuide(true)
      }, 1500)

      return () => {
        clearTimeout(timer)
      }
    }
  }, [])

  const handleClose = () => {
    setShowGuide(false)
    localStorage.setItem('hasVisitedCard', 'true')
  }

  return (
    <>
      {showGuide && <Overlay onClick={handleClose} />}

      <GuideContainer $showGuide={showGuide}>
        {children}

        {showGuide && (
          <GuideTextButton onClick={handleClose}>
            새로운 기능이 추가되었어요!
          </GuideTextButton>
        )}
      </GuideContainer>
    </>
  )
}

export default TouchGuide

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.3);
  z-index: 50;
`

const GuideContainer = styled.div<{ $showGuide: boolean }>`
  position: relative;
  transition: 3s;

  &::after {
    content: '';
    position: absolute;
    inset: -8px;
    border: 4px solid ${({ theme }) => theme.colors.secondary.dark};
    border-radius: 10px;
    pointer-events: none;
    z-index: 51;
    opacity: ${({ $showGuide }) => ($showGuide ? 1 : 0)};
    animation: ${({ $showGuide }) =>
      $showGuide ? 'fadeInBorder 0.5s ease-out forwards' : 'none'};
  }

  @keyframes fadeInBorder {
    from {
      opacity: 0;
      inset: 0;
    }
    to {
      opacity: 1;
      inset: -8px;
    }
  }
`

const GuideTextButton = styled.button`
  position: absolute;
  bottom: -20px;
  left: 50%;
  transform: translate(-50%, 100%);

  background-color: rgba(255, 255, 255, 0.98);
  padding: 8px 12px;
  border-radius: 8px;
  font-size: 16px;
  white-space: nowrap;
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.15);
  color: #000;
  font-weight: 500;
  z-index: 51;
  animation: fadeInUp 0.5s ease-out, bounce 2s ease-in-out infinite;

  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translate(-50%, 10px);
    }
    to {
      opacity: 1;
      transform: translate(-50%, 100%);
    }
  }

  @keyframes bounce {
    0% {
      transform: translate(-50%, 100%);
      animation-timing-function: ease-out;
    }
    25% {
      transform: translate(-50%, calc(100% - 12px));
      animation-timing-function: ease-in;
    }
    50% {
      transform: translate(-50%, 100%);
      animation-timing-function: ease-out;
    }
    75% {
      transform: translate(-50%, calc(100% - 8px));
      animation-timing-function: ease-in;
    }
    100% {
      transform: translate(-50%, 100%);
    }
  }
`
