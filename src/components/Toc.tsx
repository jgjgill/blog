import styled from '@emotion/styled'
import React from 'react'
import { TableItem } from 'types/content'

import { Link } from './@shared'

interface Props {
  toc: {
    items?: TableItem[]
  }
}

const Toc = ({ toc }: Props) => {
  return (
    <Aside>
      <TocElement toc={toc} />
    </Aside>
  )
}

const TocElement = ({ toc }: Props) => {
  return (
    <List>
      {toc.items &&
        toc.items.map((item) => (
          <Item key={item.title}>
            <StyledLink to={item.url}>{item.title}</StyledLink>
            {item.items && <TocElement toc={item} />}
          </Item>
        ))}
    </List>
  )
}

export default Toc

const Aside = styled.aside`
  position: fixed;
  top: 100px;
  right: 20px;
  border-left: 3px solid ${({ theme }) => theme.colors.primary.base};
  width: 200px;

  @media (max-width: 1200px) {
    opacity: 0;
  }
`

const List = styled.ul`
  padding-left: 10px;
`

const Item = styled.li`
  line-height: 1.6;
`

const StyledLink = styled(Link)`
  transition: 0.3s;

  &:hover {
    color: ${({ theme }) => theme.colors.primary.base};
  }
`
