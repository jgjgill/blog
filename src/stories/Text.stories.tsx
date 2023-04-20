import { Meta, StoryObj } from '@storybook/react'
import React from 'react'

import Text from '../components/@shared/Text'

const meta: Meta<typeof Text> = {
  title: 'Text',
  component: Text,
  argTypes: {
    text: { control: { type: 'text' } },
  },
}

export default meta
type Story = StoryObj<typeof Text>

export const Primary: Story = {
  args: { text: 'Text' },
  render: (args) => <Text {...args}>{args.text}</Text>,
}
