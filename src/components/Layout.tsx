import { Global } from '@emotion/react'
import styled from '@emotion/styled'
import * as React from 'react'
import { globalStyles } from 'styles/globalStyles'
import { StrictPropsWithChildren } from 'types/custom'

const Layout = ({ children }: StrictPropsWithChildren) => {
  return (
    <Temp>
      <Global styles={globalStyles} />

      <header>header</header>
      <main>{children}</main>
    </Temp>
  )
}

const Temp = styled.div`
  padding: 0 40px;
  height: 100vh;
`

export default Layout
