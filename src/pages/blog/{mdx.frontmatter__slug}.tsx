import { MDXProvider } from '@mdx-js/react'
import App from 'App'
import { Seo } from 'components'
import Comment from 'components/Comment'
import Layout from 'components/Layout'
import { graphql } from 'gatsby'
import React from 'react'

const BlogPost = ({ data, children }: any) => {
  console.log(data)
  return (
    <App>
      <Layout>
        <MDXProvider>{children}</MDXProvider>

        <Comment />
      </Layout>
    </App>
  )
}

export const query = graphql`
  query ($id: String) {
    mdx(id: { eq: $id }) {
      body
      frontmatter {
        title
      }
    }
  }
`

export const Head = () => <Seo />

export default BlogPost
