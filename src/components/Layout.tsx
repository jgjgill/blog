import { useTheme } from '@emotion/react'
import styled from '@emotion/styled'
import { Flex } from 'components/@shared'
import { PATH } from 'constants/path'
import { Link } from 'gatsby'
import { useDarkMode } from 'hooks/useDarkMode'
import { useIsViewScrollHeader } from 'hooks/useIsViewScrollHeader'
import Moon from 'images/moon.inline.svg'
import Rss from 'images/rss.inline.svg'
import Search from 'images/search.inline.svg'
import Sun from 'images/sun.inline.svg'
import React from 'react'
import { StrictPropsWithChildren } from 'types/custom'

import A2HS from './A2HS'

const Layout = ({ children }: StrictPropsWithChildren) => {
  const { themeMode, setThemeMode } = useDarkMode()
  const { isView } = useIsViewScrollHeader(300)
  const theme = useTheme()
  const iconColor = theme.colors.primary.dark

  return (
    <Container>
      <Header $isViewHeader={isView}>
        <Flex justifyContent="space-between" alignItems="center">
          <HomeLink to={PATH.HOME}>jgjgill</HomeLink>

          <Flex alignItems="center" gap={5}>
            <ThemeToggleButton
              aria-label="theme-toggle-button"
              onClick={() => setThemeMode((prev) => (prev === 'dark' ? 'light' : 'dark'))}
            >
              {themeMode === 'light' && <Sun width={25} height={25} fill={iconColor} />}
              {themeMode === 'dark' && <Moon width={25} height={25} fill={iconColor} />}
            </ThemeToggleButton>
            <Link aria-label="rss-link" to={PATH.RSS}>
              <Rss width={25} height={25} fill={iconColor} />
            </Link>
            <Link aria-label="search-link" to={PATH.SEARCH}>
              <Search width={25} height={25} fill={iconColor} />
            </Link>
          </Flex>
        </Flex>
      </Header>

      <Main>{children}</Main>
      <A2HS />
    </Container>
  )
}

export default Layout

const Container = styled.div`
  // height: 100vh;
  width: 100%;
  // background: teal;
`

const Header = styled.header<{ $isViewHeader: boolean }>`
  display: flex;
  align-items: center;
  position: fixed;
  height: 60px;
  backdrop-filter: saturate(200%) blur(1ex);
  background: linear-gradient(to top, #d8b4fe 0%, #f0abfc 100%);
  width: 100%;
  padding: 20px;
  z-index: 1;
  transition: 1s;
  top: 0;
  transform: translateY(${({ $isViewHeader }) => ($isViewHeader ? '0' : '-80px')});

  > div {
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
  padding-top: 100px;
  max-width: 768px;
`

const ThemeToggleButton = styled.button`
  transition: 0.3s;
`
