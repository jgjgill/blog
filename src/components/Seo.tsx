import React from 'react'

interface Props {
  title?: string
  description?: string
  siteUrl?: string
}

const Seo = ({ title = 'jgjgill', description = 'jgjgill-blog', siteUrl }: Props) => {
  return (
    <>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content="development" />
      <meta name="author" content="jgjgill" />
      <meta property="og:type" content="website" />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={siteUrl} />
      <meta property="og:title" content="jgjgill" />
      <meta property="og:description" content="jgjgill-description" />
      <meta property="og:site_name" content="jgjgill-blog" />
      <meta property="og:locale" content="ko_KR" />
      <meta
        property="og:image"
        content="https://raw.githubusercontent.com/jgjgill/blog/main/src/images/test.png"
      />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
    </>
  )
}

export default Seo
