import styled from '@emotion/styled'
import { PATH } from 'constants/path'
import { navigate } from 'gatsby'
import React from 'react'
import { Content } from 'types/content'
import { viewTransition } from 'utils/view-transition'

interface Props {
  contents: Content[]
}

const DateToc = ({ contents }: Props) => {
  return (
    <Aside>
      <h2>Recent Posts</h2>
      <ul>
        {contents.map((content) => (
          <li key={content.id}>
            <StyledButton
              onClick={() =>
                viewTransition(() => navigate(`${PATH.ROAD}${content.frontmatter.date}`))
              }
            >
              {content.frontmatter.date.replaceAll('-', '.')}
            </StyledButton>
          </li>
        ))}
      </ul>
    </Aside>
  )
}

export default DateToc

const Aside = styled.aside`
  position: fixed;
  top: 100px;
  left: 20px;
  border-left: 3px solid ${({ theme }) => theme.colors.primary.base};
  width: 300px;
  height: calc(100vh - 128px);
  padding: 0 10px;
  overflow-y: scroll;
  ::-webkit-scrollbar {
    width: 3px;
  }

  ::-webkit-scrollbar-thumb {
    border-radius: 20px;
    background: ${({ theme }) => theme.colors.primary.base};
  }

  ::-webkit-scrollbar-track {
    background-color: ${({ theme }) => theme.colors.primary.light};
  }

  @media (max-width: 1400px) {
    display: none;
  }
`

const StyledButton = styled.button`
  &:hover {
    color: ${({ theme }) => theme.colors.primary.base};
  }
`
