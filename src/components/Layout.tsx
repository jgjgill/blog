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
          <HomeLink to={PATH.HOME}>jgjgill</HomeLink>
        </Flex>
      </Header>
      <Main>{children}</Main>
    </Container>
  )
}

export default Layout

const Container = styled.div`
  height: 100vh;
  width: 100%;
`

const Header = styled.header`
  display: flex;
  align-items: center;
  position: sticky;
  height: 60px;
  top: 0px;
  backdrop-filter: saturate(200%) blur(1ex);
  background: linear-gradient(to top, #d8b4fe 0%, #f0abfc 100%);
  width: 100%;
  padding: 20px;
  z-index: 1;

  div {
    width: 768px;
    margin: 0 auto;
  }
`
const HomeLink = styled(Link)`
  font-size: ${({ theme }) => theme.fontSize.xxl};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  color: ${({ theme }) => theme.colors.primary.dark};
`

const Main = styled.main`
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  padding: 20px;
  max-width: 768px;
`
