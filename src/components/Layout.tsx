import styled from '@emotion/styled'
import { Flex, Link } from 'components/@shared'
import { PATH } from 'constants/path'
import Moon from 'images/moon.inline.svg'
import Rss from 'images/rss.inline.svg'
import Sun from 'images/sun.inline.svg'
import { throttle } from 'lodash'
import React, { useEffect, useMemo, useRef, useState } from 'react'
import { StrictPropsWithChildren } from 'types/custom'

const Layout = ({ children }: StrictPropsWithChildren) => {
  const [themeMode, setThemeMode] = useState<'dark' | 'light'>(
    typeof window !== 'undefined' &&
      (localStorage.getItem('theme') === 'dark' ||
        (!('theme' in localStorage) &&
          window.matchMedia('(prefers-color-scheme: dark)').matches))
      ? 'dark'
      : 'light',
  )

  const [isViewHeader, setIsViewHeader] = useState(true)
  const beforeScrollY = useRef<number>(0)

  const handleScroll = useMemo(
    () =>
      throttle(() => {
        if (typeof window === 'undefined') return
        const currentScrollY = window.scrollY

        if (currentScrollY < 300) setIsViewHeader(true)
        else {
          beforeScrollY.current < currentScrollY
            ? setIsViewHeader(false)
            : setIsViewHeader(true)
        }

        beforeScrollY.current = currentScrollY
      }, 300),
    [],
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

  useEffect(() => {
    if (typeof window === 'undefined') return

    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [handleScroll])

  return (
    <Container>
      <Header $isViewHeader={isViewHeader}>
        <Flex justifyContent="space-between" alignItems="center">
          <HomeLink to={PATH.HOME}>jgjgill</HomeLink>

          <div>
            <ThemeToggleButton
              onClick={() => setThemeMode((prev) => (prev === 'dark' ? 'light' : 'dark'))}
            >
              {themeMode === 'light' && <Sun width={25} height={25} fill="#7e22ce" />}
              {themeMode === 'dark' && <Moon width={25} height={25} fill="#7e22ce" />}
            </ThemeToggleButton>
            <Link to={PATH.RSS}>
              <Rss width={25} height={25} fill="#7e22ce" />
            </Link>
          </div>
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
