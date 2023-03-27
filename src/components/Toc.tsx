import styled from '@emotion/styled'
import { Link } from 'gatsby'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { TableItem } from 'types/content'

interface Props {
  toc: {
    items?: TableItem[]
  }
}

const Toc = ({ toc }: Props) => {
  return (
    <Aside>
      <TocElement toc={toc} />
    </Aside>
  )
}

const TocElement = ({ toc }: Props) => {
  const [scrollTocId, setScrollTocId] = useState('')

  const contentRef = useRef<{ [index: string]: IntersectionObserverEntry }>({})

  const callback = useCallback(
    (entries: IntersectionObserverEntry[], observer: IntersectionObserver) => {
      entries.forEach((entry) => {
        contentRef.current[entry.target.id] = entry
      })

      const visibleContent = Object.values(contentRef.current).filter(
        (content) => content.isIntersecting,
      )
      setScrollTocId(visibleContent[0]?.target.id)
    },
    [],
  )

  useEffect(() => {
    const obeserver = new IntersectionObserver(callback)
    const contents = document.querySelectorAll('h1, h2, h3')

    contents.forEach((content) => obeserver.observe(content))

    return () => obeserver.disconnect()
  }, [callback])

  return (
    <TocList>
      {toc.items &&
        toc.items.map((item) => (
          <TocItem key={item.title}>
            <StyledLink
              to={item.url}
              className={scrollTocId === item.url.slice(1) ? 'active' : ''}
            >
              {item.title}
            </StyledLink>
            {item.items && <TocElement toc={item} />}
          </TocItem>
        ))}
    </TocList>
  )
}

export default Toc

const Aside = styled.aside`
  position: fixed;
  top: 100px;
  right: 20px;
  border-left: 3px solid ${({ theme }) => theme.colors.primary.base};
  width: 300px;
  height: calc(100vh - 128px);
  padding: 0 10px;
  overflow-y: scroll;
  ::-webkit-scrollbar {
    width: 3px;
  }

  ::-webkit-scrollbar-thumb {
    border-radius: 20px;
    background: ${({ theme }) => theme.colors.secondary.base};
  }

  ::-webkit-scrollbar-track {
    background-color: ${({ theme }) => theme.colors.secondary.light};
  }

  @media (max-width: 1400px) {
    display: none;
  }
`

const TocList = styled.ul`
  padding-left: 10px;
`

const TocItem = styled.li`
  line-height: 1.6;
`

const StyledLink = styled(Link)`
  transition: 0.3s;

  &.active {
    color: ${({ theme }) => theme.colors.primary.base};
  }

  &:hover {
    color: ${({ theme }) => theme.colors.primary.base};
  }
`
