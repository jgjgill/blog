import styled from '@emotion/styled'
import React from 'react'
import { StrictPropsWithChildren } from 'types/custom'

const Mdx = ({ children }: StrictPropsWithChildren) => children

const H1 = ({ ...props }) => <StyledH1 {...props} />
const H2 = ({ ...props }) => <StyledH2 {...props} />
const H3 = ({ ...props }) => <StyledH3 {...props} />
const P = ({ ...props }) => <StyledP {...props} />
const Ul = ({ ...props }) => <StyledUl {...props} />
const Li = ({ ...props }) => <StyledLi {...props} />
const Anchor = ({ ...props }) => <StyledAnchor {...props} />
const Blockquote = ({ ...props }) => <StyledBlockquote {...props} />
const Image = ({ ...props }) => <StyledImage {...props} />
const Callout = ({ ...props }) => <StyledCallout {...props} />
const Video = ({ ...props }) => (
  <StyledVideo height={400} controls {...props}>
    <source src={props.src} type="video/mp4" />
    {props.alt}
  </StyledVideo>
)

export default Mdx
Mdx.H1 = H1
Mdx.H2 = H2
Mdx.H3 = H3
Mdx.P = P
Mdx.UL = Ul
Mdx.LI = Li
Mdx.ANCHOR = Anchor
Mdx.BLOCKQUOTE = Blockquote
Mdx.IMAGE = Image
Mdx.CALLOUT = Callout
Mdx.VIDEO = Video

const StyledH1 = styled.h1`
  line-height: 2;
  margin: 20px 0;
`

const StyledH2 = styled.h2`
  line-height: 1.9;
  margin: 15px 0;
`
const StyledH3 = styled.h3`
  line-height: 1.8;
  margin: 10px 0;
`

const StyledP = styled.p`
  line-height: 1.7;
  margin: 5px 0;
`

const StyledUl = styled.ul`
  list-style: disc;
  padding: 0 10px;
`
const StyledLi = styled.li`
  ::marker {
    color: ${({ theme }) => theme.colors.primary.base};
  }

  line-height: 1.6;
  padding: 5px 0;
`

const StyledAnchor = styled.a`
  transition: 0.3;
  font-weight: ${({ theme }) => theme.fontWeight.bold};

  :not(.anchor) {
    border-bottom: 2px solid ${({ theme }) => theme.colors.primary.base};
  }

  &:hover {
    color: ${({ theme }) => theme.colors.primary.base};
  }
`

const StyledBlockquote = styled.blockquote`
  margin: 10px 0;
  border-left: 4px solid ${({ theme }) => theme.colors.secondary.base};
  padding: 10px 10px 10px 20px;
  background-color: ${({ theme }) => theme.colors.gray};
`

const StyledImage = styled.img`
  margin: 20px 0;
`

const StyledCallout = styled.aside`
  border-radius: 10px;
  background-color: ${({ theme }) => theme.colors.primary.light};
  padding: 10px;
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  margin-bottom: 20px;
  color: ${({ theme }) => theme.colors.black};

  p {
    color: ${({ theme }) => theme.colors.black};
  }
`

const StyledVideo = styled.video`
  margin: 20px 0;
`
