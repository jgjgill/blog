import styled from '@emotion/styled'
import { PATH } from 'constants/path'
import * as React from 'react'
import { StrictPropsWithChildren } from 'types/custom'

import Link from './@shared/Link'

const Layout = ({ children }: StrictPropsWithChildren) => {
  return (
    <Container>
      <Header>
        <Link path={PATH.HOME} text="jgjgill" />
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
  padding-top: 60px;
  top: -70px;
  backdrop-filter: blur(30px);
  background: linear-gradient(to top, #c471f5 0%, #fa71cd 100%);
`
const Main = styled.main`
  max-width: 768px;
  margin: 0 auto;
`
