import { Meta, StoryObj } from '@storybook/react'
import React from 'react'

import Text from '../components/@shared/Flex'

const meta: Meta<typeof Text> = {
  title: 'Text',
  component: Text,
}

export default meta
type Story = StoryObj<typeof Text>

export const Primary: Story = {
  render: (args) => <Text {...args}>Text</Text>,
}
