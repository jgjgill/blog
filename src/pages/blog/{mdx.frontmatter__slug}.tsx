import { MDXProvider } from '@mdx-js/react'
import App from 'App'
import { Seo } from 'components'
import Heading from 'components/@shared/Heading'
import Layout from 'components/Layout'
import Temp from 'components/Temp'
import { graphql } from 'gatsby'
import React from 'react'

const BlogPost = ({ data, children }: any) => {
  console.log(data)
  return (
    <App>
      <Layout>
        <MDXProvider
          components={{
            h1: (props) => <h1 style={{ color: `tomato` }} {...props} />,
            h2: (props) => <p {...props} style={{ color: 'red' }} />,
            blockquote: (props) => <code {...props} style={{ color: 'blue' }} />,
          }}
        >
          <Temp>{children}</Temp>
        </MDXProvider>
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
