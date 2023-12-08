import React from 'react'

interface Props {
  title?: string
  description?: string
  siteUrl?: string
  ogImage?: string
}

const Seo = ({
  title = 'jgjgill',
  description = '프론트엔드 개발자 이종길입니다. - Go High',
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
