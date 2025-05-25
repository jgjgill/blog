import styled from '@emotion/styled'
import { PATH } from 'constants/path'
import { Link } from 'gatsby'
import React from 'react'
import { Content } from 'types/content'

interface Props {
  contents: Content[]
}

const DateToc = ({ contents }: Props) => {
  return (
    <Aside>
      <UlTag>
        {contents.map((content) => (
          <LiTag key={content.id}>
            <Link to={`${PATH.ROAD}${content.frontmatter.date}`}>
              <b>{content.frontmatter.date.replaceAll('-', '.')}</b>
              <p>{content.frontmatter.title}</p>
            </Link>
          </LiTag>
        ))}
      </UlTag>
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
  padding: 32px 10px;
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

const UlTag = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 12px;
`

const LiTag = styled.li`
  p {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  &:hover {
    b {
      color: ${({ theme }) => theme.colors.primary.base};
    }
    p {
      color: ${({ theme }) => theme.colors.primary.base};
    }
  }
`
