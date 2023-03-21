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
      <Item to={`${PATH.HOME}`} isactive={+(selectedCategory === 'all')}>
        All
      </Item>
      <Item
        to={`${PATH.CATEGORY}development`}
        isactive={+(selectedCategory === 'development')}
      >
        Development
      </Item>
      <Item to={`${PATH.CATEGORY}essay`} isactive={+(selectedCategory === 'essay')}>
        Essay
      </Item>
      <Item to={`${PATH.CATEGORY}reading`} isactive={+(selectedCategory === 'reading')}>
        Reading
      </Item>
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
  color: ${({ theme, isactive }) => isactive && theme.colors.secondary.dark};
  &:hover {
    color: ${({ theme }) => theme.colors.secondary.dark};
  }
`
