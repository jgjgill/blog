import { graphql, HeadFC, PageProps } from 'gatsby'
import * as React from 'react'
import { Content } from 'types/content'

interface Props {
  allMdx: {
    nodes: Content[]
  }
}

const IndexPage = ({ data }: PageProps<Props>) => {
  return (
    <div>
      {data.allMdx.nodes.map((node) => (
        <div key={node.id}>
          <div>{node.frontmatter.date}</div>
          <div>{node.frontmatter.title}</div>
          <div>{node.frontmatter.slug}</div>
          <div>{node.excerpt}</div>
        </div>
      ))}
    </div>
  )
}

export const query = graphql`
  query {
    allMdx(sort: { frontmatter: { date: DESC } }) {
      nodes {
        frontmatter {
          date(formatString: "MMMM DD, YYYY")
          title
          slug
        }
        id
        excerpt
      }
    }
  }
`

export const Head: HeadFC = () => <title>jgjgill</title>

export default IndexPage
