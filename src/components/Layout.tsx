import { css } from '@emotion/react'
import styled from '@emotion/styled'
import { Flex, Link } from 'components/@shared'
import { PATH } from 'constants/path'
import React, { useEffect, useState } from 'react'
import { StrictPropsWithChildren } from 'types/custom'

const Layout = ({ children }: StrictPropsWithChildren) => {
  const [themeMode, setThemeMode] = useState(
    typeof window !== 'undefined' &&
      (localStorage.getItem('theme') === 'dark' ||
        (!('theme' in localStorage) &&
          window.matchMedia('(prefers-color-scheme: dark)').matches))
      ? 'dark'
      : 'light',
  )

  useEffect(() => {
    if (themeMode === 'dark') {
      document.body.classList.add('dark')
      typeof window !== 'undefined' && localStorage.setItem('theme', 'dark')
    } else {
      document.body.classList.remove('dark')
      typeof window !== 'undefined' && localStorage.setItem('theme', 'light')
    }
  }, [themeMode])

  return (
    <Container>
      <Header>
        <Flex justifyContent="flex-start" alignItems="center">
          <HomeLink to={PATH.HOME}>jgjgill</HomeLink>
        </Flex>
      </Header>

      <Main>
        <button
          type="button"
          onClick={() => setThemeMode((prev) => (prev === 'dark' ? 'light' : 'dark'))}
          css={css`
            margin-left: auto;
            background-color: #c471f5;
            padding: 5px 10px;
            border-radius: 10px;
          `}
        >
          Dark Mode
        </button>
        {children}
      </Main>
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
  color: ${({ theme }) => theme.colors.primary.dark} !important;
`

const Main = styled.main`
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  padding: 20px;
  max-width: 768px;
`
