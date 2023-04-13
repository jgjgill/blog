import type { Meta, StoryObj } from '@storybook/react'
import React from 'react'

import Flex from '../components/@shared/Flex'

const meta: Meta<typeof Flex> = {
  title: 'Flex',
  component: Flex,
  argTypes: {
    flexDirection: {
      options: ['row', 'row-reverse', 'column', 'column-reverse'],
      control: { type: 'radio' },
    },
    justifyContent: {
      options: ['flex-start', 'center', 'flex-end'],
      control: { type: 'radio' },
    },
    alignItems: {
      options: ['baseline', 'start', 'end', 'center', 'stretch'],
      control: { type: 'radio' },
    },
    gap: { type: 'number' },
  },
}

export default meta
type Story = StoryObj<typeof Flex>

export const Primary: Story = {
  args: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'baseline',
    gap: 0,
  },
  render: (args) => (
    <Flex {...args}>
      <div>flex1</div>
      <div>flex2</div>
      <div>flex3</div>
    </Flex>
  ),
}
