import { useTheme } from '@emotion/react'
import styled from '@emotion/styled'
import { Flex } from 'components/@shared'
import { PATH } from 'constants/path'
import { useThemeContext } from 'context/themeContext'
import { Link } from 'gatsby'
import { useIsViewScrollHeader } from 'hooks/useIsViewScrollHeader'
import Moon from 'images/moon.inline.svg'
import Rss from 'images/rss.inline.svg'
import Search from 'images/search.inline.svg'
import Sun from 'images/sun.inline.svg'
import React from 'react'
import { StrictPropsWithChildren } from 'types/custom'

import A2HS from './A2HS'

const Layout = ({ children }: StrictPropsWithChildren) => {
  const { isView } = useIsViewScrollHeader(300)
  const theme = useTheme()

  const { colorMode, setColorMode } = useThemeContext()

  const iconColor = colorMode === 'dark' ? 'rgba(255, 255, 255, 0.8)' : theme.colors.black

  return (
    <Container>
      <Header $isViewHeader={isView}>
        <Flex justifyContent="space-between" alignItems="center">
          <HomeLink to={PATH.HOME}>jgjgill</HomeLink>

          <NavLink gap={20}>
            <Link aria-label="posts-link" to={PATH.POST}>
              Post
            </Link>
            <Link aria-label="about-link" to={PATH.ABOUT}>
              About
            </Link>
            <Link aria-label="road-link" to={PATH.ROAD}>
              Road
            </Link>
          </NavLink>

          <Flex alignItems="center" gap={5}>
            <ThemeToggleButton
              aria-label="theme-toggle-button"
              onClick={() => setColorMode(colorMode === 'dark' ? 'dark' : 'light')}
            >
              {colorMode === 'dark' && <Sun width={25} height={25} fill={iconColor} />}
              {colorMode === 'light' && <Moon width={25} height={25} fill={iconColor} />}
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
      <Footer>@2023 powered by jgjgill</Footer>
    </Container>
  )
}

export default Layout

const Container = styled.div`
  width: 100%;
`

const Header = styled.header<{ $isViewHeader: boolean }>`
  display: flex;
  align-items: center;
  position: fixed;
  height: 60px;
  backdrop-filter: saturate(200%) blur(1ex);
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
  color: ${({ theme }) => theme.colors.primary.base};
`

const NavLink = styled(Flex)`
  margin-right: auto;
  margin-left: 40px;
`

const Main = styled.main`
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  padding: 20px;
  padding-top: 100px;
  max-width: 768px;
`

const ThemeToggleButton = styled.button``

const Footer = styled.footer`
  padding: 20px 0;
  text-align: center;
`
