import type { Meta, StoryObj } from '@storybook/react'
import React from 'react'

import Mdx from '../components/Mdx'

const meta: Meta<typeof Mdx> = {
  title: 'Mdx',
  args: {},
}

export default meta
type Story = StoryObj<typeof Mdx>

export const Heading: Story = {
  render: () => (
    <div>
      <Mdx.H1>H1</Mdx.H1>
      <Mdx.H2>H2</Mdx.H2>
      <Mdx.H3>H3</Mdx.H3>
    </div>
  ),
}

export const Paragraph: Story = {
  render: () => (
    <div>
      {[1, 2, 3].map((key) => (
        <Mdx.P key={key}>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Repellendus officiis
          debitis magnam incidunt perspiciatis facere iste voluptatum in, ipsum id ullam
          reiciendis alias, vitae dolores! Blanditiis officiis quaerat numquam tenetur!
        </Mdx.P>
      ))}
    </div>
  ),
}

export const List: Story = {
  render: () => (
    <Mdx.UL>
      {[1, 2, 3, 4, 5].map((key) => (
        <Mdx.LI key={key}>{key}번째 항목</Mdx.LI>
      ))}
    </Mdx.UL>
  ),
}

export const Anchor: Story = {
  render: () => (
    <Mdx.ANCHOR href="https://jgjgill-blog.netlify.app">jgjgill-blog</Mdx.ANCHOR>
  ),
}

export const Blockquote: Story = {
  render: () => (
    <Mdx.BLOCKQUOTE>
      Lorem ipsum dolor sit amet consectetur, adipisicing elit. Repellendus officiis
      debitis magnam incidunt perspiciatis facere iste voluptatum in, ipsum id ullam
      reiciendis alias, vitae dolores! Blanditiis officiis quaerat numquam tenetur!
    </Mdx.BLOCKQUOTE>
  ),
}

export const Image: Story = {
  render: () => (
    <Mdx.IMAGE src="https://raw.githubusercontent.com/jgjgill/blog/main/src/images/icon.png" />
  ),
}

export const Callout: Story = {
  render: () => (
    <Mdx.CALLOUT>
      💡 Lorem ipsum dolor sit amet consectetur, adipisicing elit. Repellendus officiis
      debitis magnam incidunt perspiciatis facere iste voluptatum in, ipsum id ullam
      reiciendis alias, vitae dolores! Blanditiis officiis quaerat numquam tenetur!
    </Mdx.CALLOUT>
  ),
}
