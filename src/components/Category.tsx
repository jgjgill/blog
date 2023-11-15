import styled from '@emotion/styled'
import { PATH } from 'constants/path'
import { graphql, Link, useStaticQuery } from 'gatsby'
import React from 'react'

interface Props {
  selectedCategory: string
}

interface CategoryPostCount {
  allMdx: {
    totalCount: number
    group: {
      totalCount: number
      fieldValue: string
    }[]
  }
}

const Category = ({ selectedCategory }: Props) => {
  const data: CategoryPostCount = useStaticQuery(graphql`
    query {
      allMdx {
        totalCount
        group(field: { frontmatter: { category: SELECT } }) {
          totalCount
          fieldValue
        }
      }
    }
  `)

  return (
    <List>
      <Item to={`${PATH.POST}`} isactive={+(selectedCategory === 'all')}>
        All ({data.allMdx.totalCount})
      </Item>

      {data.allMdx.group.map((category) => (
        <Item
          key={category.fieldValue}
          to={`${PATH.CATEGORY}${category.fieldValue}`}
          isactive={+(selectedCategory === category.fieldValue)}
        >
          {category.fieldValue} ({category.totalCount})
        </Item>
      ))}
    </List>
  )
}

export default Category

const List = styled.nav`
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  gap: 10px;
  width: 100%;
  height: 100%;
  padding: 20px;
`

const Item = styled(Link)<{ isactive: number }>`
  height: 100%;
  text-align: center;
  border: 1px;
  padding: 10px 20px;
  border-radius: 30px;
  background-color: ${({ theme, isactive }) =>
    isactive ? theme.colors.black : theme.colors.gray};
  color: ${({ theme, isactive }) => (isactive ? theme.colors.white : theme.colors.black)};
`
