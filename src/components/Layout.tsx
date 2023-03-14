import styled from '@emotion/styled'
import { PATH } from 'constants/path'
import * as React from 'react'
import { StrictPropsWithChildren } from 'types/custom'

import Link from './@shared/Link'

const Layout = ({ children }: StrictPropsWithChildren) => {
  return (
    <Container>
      <Header>
        <div>
          <StyledLink to={PATH.HOME}>jgjgill</StyledLink>
        </div>
      </Header>

      <Main>{children}</Main>
    </Container>
  )
}

export default Layout

const Container = styled.div`
  min-height: 100vh;
`

const Header = styled.header`
  display: flex;
  align-items: center;
  position: sticky;
  height: 60px;
  padding: 20px;
  top: 0px;
  backdrop-filter: saturate(200%) blur(1ex);
  background: linear-gradient(to top, #d8b4fe 0%, #f0abfc 100%);

  div {
    width: 768px;
    margin: 0 auto;
  }
`
const Main = styled.main`
  max-width: 768px;
  margin: 0 auto;
  padding: 20px;
`
const StyledLink = styled(Link)`
  font-size: ${({ theme }) => theme.fontSize.xxl};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
`
