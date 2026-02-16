import styled from '@emotion/styled'
import { MDXProvider } from '@mdx-js/react'
import { Comment, Mdx, Toc } from 'components'
import { Flex } from 'components/@shared'
import GoogleAdsense from 'components/GoogleAdsense'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import { useIsMobile } from 'hooks/useIsMobile'
import React, { useEffect, useMemo, useRef, useState } from 'react'
import { Blog } from 'types/content'
import { readingTimeWithCount } from 'utils/reading-time'

const MDX_COMPONENTS = {
  h1: Mdx.H1,
  h2: Mdx.H2,
  h3: Mdx.H3,
  h4: Mdx.H4,
  p: Mdx.P,
  ul: Mdx.UL,
  li: Mdx.LI,
  a: Mdx.ANCHOR,
  blockquote: Mdx.BLOCKQUOTE,
  Image: Mdx.IMAGE,
  Callout: Mdx.CALLOUT,
  Video: Mdx.VIDEO,
}

interface Props {
  mdx: Blog
  children: React.ReactNode
}

const BlogPost = ({ mdx, children }: Props) => {
  const thumbnail = getImage(mdx.frontmatter.thumbnail)
  const readingTime = useMemo(() => readingTimeWithCount(mdx.body), [mdx.body])
  const isMobile = useIsMobile()

  // 모바일에서 Toc hydration 방지 (CSS display:none이지만 JS는 실행됨)
  const [showToc, setShowToc] = useState(false)

  // Comment lazy loading (페이지 최하단이므로 뷰포트 근접 시에만 마운트)
  const [showComment, setShowComment] = useState(false)
  const commentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const mql = window.matchMedia('(min-width: 1401px)')
    setShowToc(mql.matches)
    const handler = (e: MediaQueryListEvent) => setShowToc(e.matches)
    mql.addEventListener('change', handler)
    return () => mql.removeEventListener('change', handler)
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShowComment(true)
          observer.disconnect()
        }
      },
      { rootMargin: '200px' },
    )
    if (commentRef.current) observer.observe(commentRef.current)
    return () => observer.disconnect()
  }, [])

  if (!thumbnail) throw new Error('이미지가 존재하지 않습니다!')

  return (
    <>
      <h1>{mdx.frontmatter.title}</h1>
      <time>{mdx.frontmatter.date}</time>
      <span>{readingTime.minutes} min read</span>
      {showToc && <Toc toc={mdx.tableOfContents} />}
      <Flex flexDirection="column" style={{ marginBottom: '8px' }}>
        <Flex justifyContent="center">
          <ThumbnailImage image={thumbnail} alt={mdx.frontmatter.thumbnail_alt} />
        </Flex>

        {isMobile !== null && (
          <GoogleAdsense
            slot={isMobile ? '8557857579' : '6154008098'}
            width={isMobile ? '300px' : '728px'}
            height={isMobile ? '50px' : '90px'}
          />
        )}
      </Flex>

      <MDXProvider components={MDX_COMPONENTS}>{children}</MDXProvider>
      <div ref={commentRef}>{showComment && <Comment />}</div>
    </>
  )
}

export default BlogPost

const ThumbnailImage = styled(GatsbyImage)`
  margin: 20px 0;

  width: 50%;

  @media (max-width: 480px) {
    width: 100%;
  }
`
