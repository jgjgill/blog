import styled from '@emotion/styled'
import { PATH } from 'constants/path'
import React from 'react'

import Link from './@shared/Link'

interface Props {
  selectedCategory: string
}

const Category = ({ selectedCategory }: Props) => {
  return (
    <List>
      <Item to={`${PATH.HOME}`} active={selectedCategory === 'all'}>
        All
      </Item>
      <Item
        to={`${PATH.CATEGORY}development`}
        active={selectedCategory === 'development'}
      >
        Development
      </Item>
      <Item to={`${PATH.CATEGORY}essay`} active={selectedCategory === 'essay'}>
        Essay
      </Item>
      <Item to={`${PATH.CATEGORY}reading`} active={selectedCategory === 'reading'}>
        Reading
      </Item>
    </List>
  )
}

export default Category

const List = styled.ul`
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  gap: 10px;
  width: 100%;
  height: 100%;
  padding: 20px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.secondary.base};
`

const Item = styled(Link)<{ active: boolean }>`
  height: 100%;
  text-align: center;
  transition: 0.3s;
  color: ${({ theme, active }) => active && theme.colors.secondary.dark};
  &:hover {
    color: ${({ theme }) => theme.colors.secondary.dark};
  }
`
