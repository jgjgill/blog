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
      <Item to={`${PATH.HOME}`} isactive={+(selectedCategory === 'all')}>
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
  border-bottom: 1px solid ${({ theme }) => theme.colors.secondary.base};
`

const Item = styled(Link)<{ isactive: number }>`
  height: 100%;
  text-align: center;
  transition: 0.3s;
  // 다크모드시 색상 활성화 유지
  color: ${({ theme, isactive }) => isactive && theme.colors.secondary.dark} !important;
  &:hover {
    color: ${({ theme }) => theme.colors.secondary.dark};
  }
`
