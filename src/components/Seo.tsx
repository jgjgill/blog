import React from 'react'

interface Props {
  title?: string
  description?: string
  siteUrl?: string
  ogImage?: string
}

const Seo = ({
  title = 'jgjgill',
  description = '프론트엔드 개발자 이종길입니다. 작은 것부터 한 걸음씩 나아가며 문제를 접근하는 것을 좋아합니다. 주변을 먼저 살피며 팀과 함께 성장하는 것을 지향합니다.',
  siteUrl = 'https://jgjgill-blog.netlify.app/',
  ogImage = 'https://raw.githubusercontent.com/jgjgill/blog/main/src/images/og-image.png',
}: Props) => {
  return (
    <>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content="development" />
      <meta name="author" content="jgjgill" />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={siteUrl} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:site_name" content="jgjgill-blog" />
      <meta property="og:locale" content="ko_KR" />
      <meta property="og:image" content={ogImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
    </>
  )
}

export default Seo
