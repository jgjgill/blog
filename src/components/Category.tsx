import styled from '@emotion/styled'
import { PATH } from 'constants/path'
import React from 'react'

import Link from './@shared/Link'

const Category = () => {
  return (
    <List>
      <Item to={`${PATH.HOME}`}>All</Item>
      <Item to={`${PATH.CATEGORY}development`}>Development</Item>
      <Item to={`${PATH.CATEGORY}essay`}>Essay</Item>
      <Item to={`${PATH.CATEGORY}reading`}>Reading</Item>
    </List>
  )
}

export default Category

const List = styled.ul`
  display: flex;
  justify-content: space-around;
  width: 100%;
`

const Item = styled(Link)``
