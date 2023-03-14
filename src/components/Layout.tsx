import styled from '@emotion/styled'
import { PATH } from 'constants/path'
import * as React from 'react'
import { StrictPropsWithChildren } from 'types/custom'

import Flex from './@shared/Flex'
import Link from './@shared/Link'

const Layout = ({ children }: StrictPropsWithChildren) => {
  return (
    <Container>
      <Header>
        <Flex justifyContent="flex-start" alignItems="center">
          <StyledLink to={PATH.HOME}>jgjgill</StyledLink>
        </Flex>
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
  position: sticky;
  height: 60px;
  top: 0px;
  padding: 0 40px;
  backdrop-filter: saturate(200%) blur(1ex);
  background: linear-gradient(to top, #d8b4fe 0%, #f0abfc 100%);
  width: 100%;
`
const StyledLink = styled(Link)`
  font-size: ${({ theme }) => theme.fontSize.xxl};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
`

const Main = styled.main`
  padding: 20px 40px;
`
