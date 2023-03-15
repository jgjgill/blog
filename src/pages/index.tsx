import styled from '@emotion/styled'
import App from 'App'
import { Seo } from 'components'
import Link from 'components/@shared/Link'
import Layout from 'components/Layout'
import { PATH } from 'constants/path'
import { graphql, HeadFC, PageProps } from 'gatsby'
import React from 'react'
import { Content } from 'types/content'

interface Props {
  allMdx: {
    nodes: Content[]
  }
}

const IndexPage = ({ data }: PageProps<Props>) => {
  return (
    <App>
      <Layout>
        <CategoryList>
          <CategoryItem>All</CategoryItem>
          <CategoryItem>Development</CategoryItem>
          <CategoryItem>Essay</CategoryItem>
        </CategoryList>

        {data.allMdx.nodes.map((node) => (
          <ul key={node.id}>
            <li>
              <h3>{node.frontmatter.title}</h3>
              <p>{node.frontmatter.slug}</p>
              <p>{node.excerpt}</p>
              <time>{node.frontmatter.date}</time>

              <Link to={`${PATH.BLOG}${node.frontmatter.slug}`}>
                {node.frontmatter.title}
              </Link>
            </li>
          </ul>
        ))}
      </Layout>
    </App>
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

export const Head: HeadFC = () => <Seo />

export default IndexPage

const CategoryList = styled.ul`
  display: flex;
  justify-content: space-around;
`

const CategoryItem = styled.li``
